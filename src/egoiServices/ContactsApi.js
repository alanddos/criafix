function ContactsApi(egoiSdk, callback, contact) {
  const api = new egoiSdk.ContactsApi();
  const opts = {
    type: "email",
  };
  api.searchContacts(contact, opts, callback);
}

module.exports = { ContactsApi };
