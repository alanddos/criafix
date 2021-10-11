var egoiSdk = require('egoiSdk');
const { ContactsApi } = require("./ContactsApi");
const { callback } = require("./Callback");

// Start session Egoi
const defaultClient = egoiSdk.ApiClient.instance;
const { Apikey } = defaultClient.authentications;
Apikey.apiKey = "d1b31fac949acb64cc5019a445a982eebae1c0fa";
// End session Egoi

const FindContact = async (contact: string) => {
  ContactsApi(egoiSdk, callback, contact);
};

module.exports = { FindContact };
