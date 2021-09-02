function ContactsApi(egoiSdk, callback) {
    var api = new egoiSdk.ContactsApi()
    // console.log(api);
    var opts = { offset: 0, limit: 2, email: null }
    api.getAllContacts(1,opts, callback)
}

module.exports = { ContactsApi }