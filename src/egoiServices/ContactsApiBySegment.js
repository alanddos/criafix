function ContactsApiBySegment(egoiSdk, callback, offset) {
    var api = new egoiSdk.ContactsApi()
    var opts = {
        'offset': 1, // Number | Element offset (starting at zero for the first element)
        'limit': 10, // Number | Number of items to return
        'showRemoved': false // Boolean | Show removed contactsnpm i
      };
      console.log(api)
      api.getAllContactsBySegment(1, 1, opts, callback);
}

module.exports = { ContactsApiBySegment }