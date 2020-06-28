import IPFS from 'ipfs';

import { createLinkedData } from '../utils/common';
import { createUser, createContact } from '../utils/user';
import { createTask } from '../utils/task';
import {
  uploadProto,
  upload,
  readUserInfo,
  readTask,
  readContracts
} from './ipfs';

const model = require('../proto/model_pb.js');

const OWNER = createUser({
  ethereumAddress: '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
  name: 'owner',
  details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, 'abc'),
  contacts: [createContact(model.Contact.ContactType.OTHER, 'other')]
});

const WORKER = createUser({
  ethereumAddress: '0xd115bffabbdd893a6f7cea402e7338643ced55a7',
  name: 'worker'
});

const TASK = createTask(OWNER, WORKER, {
  task_details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, 'abc'),
  owner_deposit_wei: 1000,
  worker_deposit_wei: 100,
  deadline_hours: 1591940028
});

const CONTRACTS = JSON.stringify([
  '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
  '0xd115bffabbdd893a6f7cea402e7338643ced55a7'
]);

let ipfsNode;

beforeAll(async () => {
  await IPFS.create().then(ipfsCreated => {
    console.time('IPFS Started');
    ipfsNode = ipfsCreated;
  });
});

afterAll(async () => {
  await ipfsNode.stop();
});

it('upload user', async () => {
  const userFile = '/test_user.profile';
  await uploadProto(ipfsNode, OWNER, userFile);
  const owner = await readUserInfo(ipfsNode, userFile);
  expect(owner.serializeBinary()).toStrictEqual(OWNER.serializeBinary());

  // read existing user info
  const owner2 = await readUserInfo(ipfsNode, userFile);
  expect(owner2.serializeBinary()).toStrictEqual(OWNER.serializeBinary());

  // update user info and read
  await uploadProto(ipfsNode, WORKER, userFile);
  const worker = await readUserInfo(ipfsNode, userFile);
  expect(worker.serializeBinary()).toStrictEqual(WORKER.serializeBinary());
});

it('upload task', async () => {
  const task_file = '/test.task';
  await uploadProto(ipfsNode, TASK, task_file);
  const task = await readTask(ipfsNode, task_file);
  expect(task.serializeBinary()).toStrictEqual(TASK.serializeBinary());
});

it('upload contracts', async () => {
  const contractFile = '/test_contracts';
  await upload(ipfsNode, CONTRACTS, contractFile);
  const contracts = await readContracts(ipfsNode, contractFile);
  expect(contracts).toBe(CONTRACTS);
});
