# A first-level heading
## A second-level heading
### A third-level heading

See https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#what

Use context.ADMIN_NUMBERS and context.SHEETS_URL or similar



// require twilio-sheets
const twilio = require('twilio-sheets');

/** initialize with the following:
 *  
 * Google sheets web app url (e.g. https://script.google.com/macros/s/[deployment-id]/exec)
 * An array of phone numbers belonging to the SMS administrators for your organization
*/
twilio.initialize("https://script.google.com/macros/s/[deployment-id]/exec", ["555-444-3210"]);

exports.handler = function(context, event, callback) {
  return twilio.handler(context, event, callback);
};