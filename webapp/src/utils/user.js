const model = require('../../proto/model_pb.js');

const CONTACT_TYPE_MAP = {
  model.Contact.ContactType.PHONE: "phone",
  model.Contact.ContactType.EMAIL: "email",
  model.Contact.ContactType.FACEBOOK: "facebook",
  model.Contact.ContactType.WECHAT: "wechat",
  model.Contact.ContactType.WHATSAPP: "whatsapp",
  model.Contact.ContactType.DISCORD: "discord",
  model.Contact.ContactType.TELEGRAM: "telegram",
  model.Contact.ContactType.OTHER: "other"
};

// [[type1, value1], [type2, value2], ...]
export const createContacts = (contactArray) => {
  return contactList.map([type, value] => createContact(type, value));
}

// ethAddress: bytes
// name: string
// details: LinkedData
// contacts: [Contact]
export const create = (ethAddress, name, details, contacts) => {
  const user = new model.User();
  user.setEthereumaddress(ethAddress); // required
  if (name) {
      user.setName(name);
  }
  if (details) {
      user.setDetails(details);
  }
  if (contacts) {
      user.setContactList(contacts);
  }
  return user;
}

export const update = (user, details, contacts) => {
  if (details) {
      user.setDetails(details);
  }
  if (contacts) {
      user.setContactList(contacts);
  }
  return user;
}

// type: Contact.ContactType, e.g. Contact.ContactType.PHONE
// value: string
export const createContact = (type, value) => {
  const contact = new model.Contact();
  contact.setType(type);
  contact.setValue(value);
  return contact;
}

// type: Contact.ContactType, e.g. Contact.ContactType.PHONE
export const contactTypeToString = (type) => {
  return CONTACT_TYPE_MAP[type];
}


