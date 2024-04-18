
var axios = require('axios');
var utilities = require('./utilities');
var SHEETS_URI = "";
var ADMIN_PHONES = [];

exports.report = () => {
    //return ADMIN_PHONES;
    return utilities.isAdmin("2536771843", ADMIN_PHONES);
}

/**
 * @param {string} sheetsWebUri - Google sheets web app url (e.g. https://script.google.com/macros/s/[deployment-id]/exec)
 * @param {string[]} adminPhones - array of phone numbers belong to the SMS administrators
 */
exports.initialize = (sheetsWebUri, adminPhones) => {
    SHEETS_URI = sheetsWebUri;
    ADMIN_PHONES = adminPhones;
}

exports.handler = async (context, event, callback) => {
  let reply = utilities.cleanReply(event.Body);
    
  // is this from an admin phone number?
  if (utilities.isAdmin(event.From, ADMIN_PHONES)) {

    // let's see if this is a new message draft or if they are already working on one
    let response = await axios.post(SHEETS_URI, {
        sender: event.From,
        action: 'draftMessage',
        reply: reply
      });

    let data = response.data.message;
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
      } else if (data.action == "prompt.schedule") {
        return callback(null, utilities.promptStep4Schedule());
      } else if (data.action == "prompt.forwarding") {
        return callback(null, utilities.promptStep5ForwardingOption());
      } else if (data.action == "prompt.review") {
        return callback(null, utilities.promptStep6FinalReview(data.sampleMessage));
      } else if (data.action == "prompt.clarify") {
        return callback(null, utilities.promptClarify(data.clarification));
      } else if (data.action == "prompt.sent") {
        return callback(null, utilities.promptSent());
      } else if (data.action == "prompt.queued") {
        return callback(null, utilities.promptQueued());
      } 
      else {
        return callback(null, `ERROR 101: unknown action ${data.action}`);
      }
    } else {
      return callback(null, "ERROR 102: no action specified");
    }
  }
  else {
    // this is from a non-admin phone number    
    // record the response in our sheet
    axios.post(SHEETS_URI, {
      sender: event.From,
      action: 'recordResponse',
      reply: reply
    });
    return callback(null, null);
  }
}