var egoiSdk = require('egoiSdk');

// Import Services
var { AdvancedReportsApi } = require('./egoiServices/AdvancedReportsApi')
var { ContactsApi } = require('./egoiServices/ContactsApi')
var { SanitizeData } = require('./cvServices/SanitizeData')
var { SendLead } = require('./cv')

// Start session Egoi
var defaultClient = egoiSdk.ApiClient.instance;
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = "d1b31fac949acb64cc5019a445a982eebae1c0fa"
// End session Egoi

var offset = 1

var callback = async function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        // console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        if (offset <= data.total_items) {
            var dados = response.body
            dados.items.map(v => {
                const lead = SanitizeData(v);
                console.log(lead)
                SendLead(lead)
            })
            offset++;
            ContactsApi(egoiSdk, callback, offset)
        } else {
            offset = 1
            ContactsApi(egoiSdk, callback, offset)
        }
    }
};

// AdvancedReportsApi(egoiSdk, callback)
ContactsApi(egoiSdk, callback, offset)


