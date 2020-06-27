import { createLinkedData } from './common';
import {
  createUser,
  updateUser,
  createContact,
  createContacts,
  contactTypeToString
} from './user';

const model = require('../proto/model_pb.js');
const contactType = model.Contact.ContactType;

it('create contact', async () => {
  const type = model.Contact.ContactType.PHONE;
  const value = "12245556789";
  const contact = createContact(type, value);
  expect(contact.getType()).toBe(type);
  expect(contact.getValue()).toBe(value);
});

it('create contacts', async () => {
  const contactArray = [
    [model.Contact.ContactType.PHONE, "12245556789"],
    [model.Contact.ContactType.WECHAT, "wechat_id"],
    [model.Contact.ContactType.OTHER, "someid"]
  ];
  const contacts = createContacts(contactArray);
  expect(contacts.length).toBe(3);
  expect(contacts[0].getType()).toBe(model.Contact.ContactType.PHONE);
  expect(contacts[0].getValue()).toBe("12245556789");
  expect(contacts[1].getType()).toBe(model.Contact.ContactType.WECHAT);
  expect(contacts[1].getValue()).toBe("wechat_id");
  expect(contacts[2].getType()).toBe(model.Contact.ContactType.OTHER);
  expect(contacts[2].getValue()).toBe("someid");
});

it('create user', async () => {
  const userObj = {
    ethereumAddress: '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
    name: "Joe Doe",
    details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
    contacts: [createContact(model.Contact.ContactType.OTHER, "other")]
  };
  const user = createUser(userObj);
  expect(user.getEthereumaddress()).toBe(userObj['ethereumAddress']);
  expect(user.getName()).toBe(userObj['name']);
  expect(user.getDetails()).toBe(userObj['details']);
  expect(user.getContactList()).toBe(userObj['contacts']);
});

it('create user with missing field', async () => {
  const userObj = {
    ethereumAddress: '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
  };
  const user = createUser(userObj);
  expect(user.getEthereumaddress()).toBe(userObj['ethereumAddress']);
  expect(user.getName()).toBe("");
  expect(user.getDetails()).toBe(undefined);
  expect(user.getContactList()).toMatchObject([]);
});

it('update user', async () => {
  const userObj = {
    ethereumAddress: '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
    name: "Joe Doe",
    details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
    contacts: [createContact(model.Contact.ContactType.OTHER, "other")]
  };
  const user = createUser(userObj);

  const update = {
    name: "somename",
    details: createLinkedData(model.LinkedData.DataType.IPFS_HASH, "hash"),
    contacts: [createContact(model.Contact.ContactType.WECHAT, "id")]
  };
  const updated = updateUser(user, update);
  expect(updated.getName()).toBe(update['name']);
  expect(updated.getDetails()).toBe(update['details']);
  expect(updated.getContactList()).toBe(update['contacts']);
});

it('update user with missing field', async () => {
  const userObj = {
    ethereumAddress: '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
    name: "Joe Doe",
    details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
    contacts: [createContact(model.Contact.ContactType.OTHER, "other")]
  };
  const user = createUser(userObj);

  const update = {
    name: "", //reset
    details: createLinkedData(model.LinkedData.DataType.IPFS_HASH, "hash"),
  };
  const updated = updateUser(user, update);
  expect(updated.getName()).toBe(update['name']);
  expect(updated.getDetails()).toBe(update['details']);
  expect(updated.getContactList()).toBe(userObj['contacts']);
});

it('linked data type to string', async () => {
  expect(contactTypeToString(contactType.PHONE)).toBe('phone');
  expect(contactTypeToString(contactType.EMAIL)).toBe('email');
  expect(contactTypeToString(contactType.FACEBOOK)).toBe('facebook');
  expect(contactTypeToString(contactType.WECHAT)).toBe('wechat');
  expect(contactTypeToString(contactType.WHATSAPP)).toBe('whatsapp');
  expect(contactTypeToString(contactType.DISCORD)).toBe('discord');
  expect(contactTypeToString(contactType.TELEGRAM)).toBe('telegram');
  expect(contactTypeToString(contactType.OTHER)).toBe('other');
});
