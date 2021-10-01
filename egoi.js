var egoiSdk = require('egoiSdk');

// Import Services
var { AdvancedReportsApi } = require('./egoiServices/AdvancedReportsApi')
var { CallbackSegment } = require('./egoiServices/CallbackSegment')
var { CallbackContact } = require('./egoiServices/CallbackContact')
var { SegmentApi } = require('./egoiServices/SegmentApi')
var { ContactsApi } = require('./egoiServices/ContactsApi')
var { ContactsApiBySegment } = require('./egoiServices/ContactsApiBySegment')
var { SanitizeData } = require('./cvServices/SanitizeData')
var { SendLead } = require('./cv')

// Start session Egoi
var defaultClient = egoiSdk.ApiClient.instance;
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = "d1b31fac949acb64cc5019a445a982eebae1c0fa"
// End session Egoi

var offset = 1

export default egoiSdk;

// ContactsApi(egoiSdk, CallbackContact, offset)
// ContactsApiBySegment(egoiSdk, CallbackContact, offset)
// SegmentApi(egoiSdk, CallbackSegment, offset)



