# Twilio Sheets

Twilio Sheets helps integrate the Twilio messaging platform with Google Sheets.

NPM [package](https://www.npmjs.com/package/twilio-sheets)

GitHub [repo](https://github.com/mountcitrus/twilio-sheets)

## Documentation

Additional guides for Twilio Sheets can be found at [mount citrus](https://mountcitrus.com/docs).

## Twilio Serverless Functions

> [!IMPORTANT]
> To get started you will need
> * A Twilio [phone number](https://www.twilio.com/en-us/phone-numbers/toll-free)
> * A Google account for creating a new sheet

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](/assets/images/twilio_account.png)


`twilio-sheets` supports...

Use `context.SHEETS_URL` and `context.ADMIN_NUMBERS` or similar environment variables.

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