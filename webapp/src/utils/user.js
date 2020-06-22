import { validateUser, validateContact } from './validator';

const model = require('../proto/model_pb.js');

// ethAddress: bytes
// name: string
// details: LinkedData
// contacts: [Contact]
export const createUser = (userObj) => {
  const user = new model.User();
  user.setEthereumaddress(userObj['ethereumAddress']); // required
  if (userObj['name'] !== undefined) {
    user.setName(userObj['name']);
  }
  if (userObj['details'] !== undefined) {
    user.setDetails(userObj['details']);
  }
  if (userObj['contacts'] !== undefined) {
    user.setContactList(userObj['contacts']);
  }
  validateUser(user);
  return user;
}

export const updateUser = (user, update) => {
  if (update['name'] !== undefined) {
    user.setName(update['name']);
  }
  if (update['details'] !== undefined) {
    user.setDetails(update['details']);
  }
  if (update['contacts'] !== undefined) {
    user.setContactList(update['contacts']);
  }
  validateUser(user);
  return user;
}

// type: Contact.ContactType, e.g. Contact.ContactType.PHONE
// value: string
export const createContact = (type, value) => {
  const contact = new model.Contact();
  contact.setType(type);
  contact.setValue(value);
  validateContact(contact);
  return contact;
}

// [[type1, value1], [type2, value2], ...]
export const createContacts = (contactArray) => {
  return contactArray.map(([type, value]) => createContact(type, value));
}

const CONTACT_TYPE_MAP = {
  [model.Contact.ContactType.PHONE]: "phone",
  [model.Contact.ContactType.EMAIL]: "email",
  [model.Contact.ContactType.FACEBOOK]: "facebook",
  [model.Contact.ContactType.WECHAT]: "wechat",
  [model.Contact.ContactType.WHATSAPP]: "whatsapp",
  [model.Contact.ContactType.DISCORD]: "discord",
  [model.Contact.ContactType.TELEGRAM]: "telegram",
  [model.Contact.ContactType.OTHER]: "other"
};

// type: Contact.ContactType, e.g. Contact.ContactType.PHONE
export const contactTypeToString = (type) => {
  return CONTACT_TYPE_MAP[type];
}
