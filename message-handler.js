
var axios = require('axios');
var utilities = require('./utilities');
var SHEETS_URI = "";
var ADMIN_PHONES = [];

/**
 * @param {string} sheetsWebUri - Google sheets web app url (e.g. https://script.google.com/macros/s/[deployment-id]/exec)
 */
exports.setSheetsWebEndpoint = (sheetsWebUri) => {
    SHEETS_URI = sheetsWebUri;
}

/**
 * @param {string[]} adminPhones - array of phone numbers belong to the SMS administrators
 */
exports.setAdminPhones = (adminPhones) => {
    ADMIN_PHONES = adminPhones;
}

exports.handler = async (context, event, callback) => {
  let reply = utilities.cleanReply(event.Body);
    
  // is this from an admin phone number?
  if (utilities.isAdmin(event.From, ADMIN_PHONES)) {

    // let's see if this is a new message draft or if they are already working on one
    let response = await axios.post(SHEETS_URI, {
        sender: event.From,
        token: utilities.getToken(context),
        action: 'draftMessage',
        reply: reply
      });

    let data = response.data.message;

    if (data == null) {
      return callback(null, `Error 100: missing doPost override`);
    }

    // errors?
    if (data.errorSummary != null) {
      return callback(null, data.errorSummary);
    }

    if (data.action != null) {
      if (data.action == "prompt.group.single") {
        return callback(null, utilities.promptStep1SingleGroup(data.group));
      } else if (data.action == "prompt.group.multiple") {
        return callback(null, utilities.promptStep1MultiGroups(data.groups));
      } else if (data.action == "prompt.greeting") {
        return callback(null, utilities.promptStep2Greeting());
      } else if (data.action == "prompt.message") {
        return callback(null, utilities.promptStep3Body(data.group));
      } else if (data.action == "prompt.forwarding") {
        return callback(null, utilities.promptStep4ForwardingOption());
      } else if (data.action == "prompt.review") {
        if (data.allowScheduling == true) {
          return callback(null, utilities.promptStep5FinalReviewWithSchedulingOption(data.sampleMessage));
        } else {
          return callback(null, utilities.promptStep5FinalReview(data.sampleMessage));
        }
      } else if (data.action == "prompt.clarify") {
        return callback(null, utilities.promptClarify(data.clarification));
      } else if (data.action == "prompt.sent") {
        return callback(null, utilities.promptSent());
      } else if (data.action == "prompt.queued") {
        return callback(null, utilities.promptQueued(data.friendlySchedule));
      } 
      else {
        return callback(null, `Error 101: unknown action ${data.action}`);
      }
    } else {
      return callback(null, "Error 102: no action specified");
    }
  }
  else {
    // this is from a non-admin phone number    
    // record the response in our sheet
    await axios.post(SHEETS_URI, {
      sender: event.From,
      token: utilities.getToken(context),
      action: 'recordResponse',
      reply: reply
    });
    return callback(null, null);
  }
}