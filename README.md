# Twilio Sheets

Twilio Sheets integrates the [Twilio](https://www.twilio.com/en-us/messaging/channels/sms) messaging platform with Google Sheets.

NPM [package](https://www.npmjs.com/package/twilio-sheets)

GitHub [repo](https://github.com/mountcitrus/twilio-sheets)

## Documentation

Additional guides for Twilio Sheets can be found at [mount citrus](https://mountcitrus.com/docs).

## Twilio Serverless Functions

> [!IMPORTANT]
> To get started you will need
> * A Twilio [phone number](https://www.twilio.com/en-us/phone-numbers/toll-free)
> * A Google account for creating a new sheet

### Create a New Service

Login to your Twilio account and create a [new service](https://console.twilio.com/us1/develop/functions/services).

### Add the `twilio-sheets` Dependency

Click * *Dependencies* *, enter `twilio-sheets` as the Module name, and specify the most current [version](https://www.npmjs.com/package/twilio-sheets?activeTab=versions).

Click Add.

![Screenshot of Twilio service dependencies.](/assets/images/twilio_function_dependencies.png)

### Environment Variables

Click * *Environment Variables* *.

As you will see, your Twilio function is associated with a specific Google sheet. When your function makes a HTTP request to your sheet, it includes your Twilio Credentials in the header. Your credentials are then validated by your sheet as a security precaution.

> [!IMPORTANT]
> The option to "Add my Twilio Credentials to ENV" must be enabled.

**Admin Phone Numbers**

The administrators are those designated to send group messages. Add a variable for each admin and include their phone number as the value.

**Sheets URL**

> [!NOTE]
> This step requires that you have already set up your Google sheet. [Here](https://mountcitrus.com/docs) are the steps for getting that done.

Create a new variable and set the value as the published endpoint for your sheet. It should look like `https://script.google.com/macros/s/[deployment-id]/exec`.

![Screenshot of Twilio environment variables.](/assets/images/twilio_function_variables.png)

### Function

Click * *Add* * then * *Add Function* * and give it an appropriate name. 

Explanation of the function shown below:

Line # 3  imports the `twilio-sheets` package
Line # 8  passes in the endpoint of published your Google sheet
Line # 11 passes in an array of admin phone numbers

![Screenshot of Twilio environment variables.](/assets/images/twilio_function.png)

* *Learn more about [serverless functions](https://www.twilio.com/docs/serverless/functions-assets/functions).* *



##

![Screenshot of Twilio account details.](/assets/images/twilio_account.png)


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