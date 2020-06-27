import {
  createLinkedData,
  linkedDataTypeToString
} from './common';

const model = require('../proto/model_pb.js');
const dataType = model.LinkedData.DataType;

it('create linked data', async () => {
  const type = model.LinkedData.DataType.IPFS_HASH;
  const value = 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG';
  const data = createLinkedData(type, value);
  expect(data.getType()).toBe(type);
  expect(data.getValue()).toBe(value);
});

it('linked data type to string', async () => {
  expect(linkedDataTypeToString(dataType.IPFS_HASH)).toBe('ipfs_hash');
  expect(linkedDataTypeToString(dataType.PLAIN_TEXT)).toBe('plain_text');
  expect(linkedDataTypeToString(dataType.WEB_URL)).toBe('web_url');
});
