function ContactsApi(egoiSdk, callback, offset) {
    var api = new egoiSdk.ContactsApi()
    // console.log(api);
    var opts = { offset, limit: 1, email: null }
    api.getAllContacts(1,opts, callback)
}

module.exports = { ContactsApi }