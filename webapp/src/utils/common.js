const model = require('../proto/model_pb.js');

const LINKED_DATA_TYPE_MAP = {
  [model.LinkedData.DataType.PLAIN_TEXT]: 'plain_text',
  [model.LinkedData.DataType.IPFS_HASH]: 'ipfs_hash',
  [model.LinkedData.DataType.WEB_URL]: 'web_url'
};

// type: LinkedData.DataType, e.g. LinkedData.DataType.IPFS_HASH
// value: string
export const createLinkedData = (type, value) => {
  const data = new model.LinkedData();
  data.setType(type);
  data.setValue(value);
  return data;
}

// type: LinkedData.DataType, e.g. LinkedData.DataType.IPFS_HASH
export const linkedDataTypeToString = (type) => {
  return LINKED_DATA_TYPE_MAP[type];
}
