# Twilio Sheets

Twilio Sheets integrates the [Twilio](https://www.twilio.com/en-us/messaging/channels/sms) messaging platform with Google Sheets.

NPM [package](https://www.npmjs.com/package/twilio-sheets)

GitHub [repo](https://github.com/mountcitrus/twilio-sheets)

## Documentation

> [!IMPORTANT]
> To get started you will need
> * A Twilio [phone number](https://www.twilio.com/en-us/phone-numbers/toll-free)
> * A Google account for creating a new sheet

## Google Sheets

A Google sheet must be created using the `Twilio Sheets` [add-on](https://mountcitrus.com/docs).

Following the instructions at [mount citrus](https://mountcitrus.com/google-add-on-guide) to get started.

## Twilio Function and Webhook Setup

### Create a New Service

Login to your Twilio account and create a [new service](https://console.twilio.com/us1/develop/functions/services).

### Add the `twilio-sheets` Dependency

Click *Dependencies*, enter `twilio-sheets` as the Module name, and set the value to the most current [version](https://www.npmjs.com/package/twilio-sheets?activeTab=versions) of the package.

Click *Add*.

![Screenshot of Twilio service dependencies.](/assets/images/twilio_function_dependencies.png)

### Environment Variables

Click *Environment Variables*.

Your Twilio function will ultimately be associated with a specific Google sheet. When your function makes a HTTP request to your sheet, it includes your Twilio credentials in the header. Your credentials are then validated by your sheet as a security precaution.

> [!IMPORTANT]
> The option to "Add my Twilio Credentials to ENV" must be enabled.

**Admin Phone Numbers**

The administrators are those designated to send group messages. Add a variable for each admin and include their phone number as the value.

**Sheets URL**

> [!NOTE]
> This step requires that you have already set up your Google sheet. [Here](https://mountcitrus.com/google-add-on-guide) are the steps for getting that done.

Create a new variable and set the value as the published endpoint for your sheet. It should look like `https://script.google.com/macros/s/[deployment-id]/exec`.

##

![Screenshot of Twilio environment variables.](/assets/images/twilio_function_variables.png)

##

### Function

Click *Add* then *Add Function* and give it an appropriate name. 

Explanation of the function shown below:

**Line #**

  2. Imports the `twilio-sheets` package
  7. Passes in the endpoint of your published Google sheet stored as an environment variable
 10. Passes in an array of admin phone numbers stored as environment variables

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

*Learn more about [serverless functions](https://www.twilio.com/docs/serverless/functions-assets/functions).*

### Function Deployment

Save your function then click *Deploy All*.

> [!TIP]
> Changes to either the dependencies *or* environment variables require a redeployment. You may have to make some trivial change to the function in order to save and redeploy.

### Messaging Webhook

The final step is to tell Twilio to run this function for all incoming messages.
 
  1. Browse to the phone number configuration screen
  2. Scroll down to the *Message Configuration* section
  3. Set the incoming message settings to reference your function

## 

![Screenshot of Twilio webhook setup.](/assets/images/twilio_webhook_config.png)