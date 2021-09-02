var egoiSdk = require('egoiSdk');

// Import Services
var { AdvancedReportsApi } = require('./egoiServices/AdvancedReportsApi')
var { ContactsApi } = require('./egoiServices/ContactsApi')

var defaultClient = egoiSdk.ApiClient.instance;

var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = "d1b31fac949acb64cc5019a445a982eebae1c0fa"

var callback = function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));

        var dados = response.body
        dados.items.map( v => {
            console.log(v)
        })
    }
};

// AdvancedReportsApi(egoiSdk, callback)
ContactsApi(egoiSdk, callback)


