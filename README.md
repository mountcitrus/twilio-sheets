# Twilio Sheets

## Documentation
The documentation for Twilio Sheets can be found [here](https://mountcitrus.com/docs).

Check out these [code examples](https://mountcitrus.com/docs) to get up and running quickly.

## Twilio Serverless Functions
`twilio-sheets` supports...

Use `context.ADMIN_NUMBERS` and `context.SHEETS_URL` or similar

```
// require twilio-sheets
const ts = require('twilio-sheets');

exports.handler = function(context, event, callback) {

  // Google sheets web app url (e.g. https://script.google.com/macros/s/[deployment-id]/exec)
  ts.setSheetsWebEndpoint(context.SHEETS_URL);

  // An array of phone numbers belonging to the SMS administrators for your organization
  ts.setAdminPhones([context.LAURA, context.JAMES]);

  return ts.handler(context, event, callback);
}
```
## Google Add-on Setup



```
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
```


See https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#what

https://github.com/twilio/twilio-node