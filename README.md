# A first-level heading
## A second-level heading
### A third-level heading

See https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#what

Use context.ADMIN_NUMBERS and context.SHEETS_URL or similar



// require twilio-sheets
const ts = require('twilio-sheets');

exports.handler = function(context, event, callback) {

  // Google sheets web app url (e.g. https://script.google.com/macros/s/[deployment-id]/exec)
  ts.setSheetsWebEndpoint(context.SHEETS_URL);

  // An array of phone numbers belonging to the SMS administrators for your organization
  ts.setAdminPhones([context.LAURA, context.JAMES]);

  return ts.handler(context, event, callback);
}

/**
* This function is called by the Twilio message handler when a text is sent to your Twilio phone number
*/
const doPost = (request = {}) => {
  const { parameter, postData: { contents, type } = {} } = request;
  return TwilioSheets.handleResponse(contents);
}

/**
* Optionally create a timer-based trigger to process all queued messages
*/
function sendQueuedMessages() {
  TwilioSheets.sendQueuedMessages();
}