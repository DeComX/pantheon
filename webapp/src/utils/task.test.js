import React from 'react';
import ReactDOM from 'react-dom';
import { createUser, createContact } from './user';
import { createLinkedData, createUint64Override } from './common';
import { ethers } from 'ethers';
import {
  createTask,
  createOwnerUpdateOp,
  createWorkerAcceptOp,
  createRequestChangeOp,
  createRequestForFinalReviewOp,
  createRecallOp,
  createRejectOp,
  createApproveOp,
  createQuitOp
} from './task';

const model = require('../proto/model_pb.js');

const COMMENT = createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "comment");
const USER1 = createUser({
  ethereumAddress: ethers.utils.arrayify("0xd115bffabbdd893a6f7cea402e7338643ced44a6"),
  name: "User1",
  task_details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
  contacts: [createContact(model.Contact.ContactType.OTHER, "other")]
});
const USER2 = createUser({
  ethereumAddress: ethers.utils.arrayify("0xd115bffabbdd893a6f7cea402e7338643ced55a7"),
  name: "User2"
});

it('create task', async () => {
  const taskObj = {
    task_details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
    owner_deposit: 1000,
    worker_deposit: 100,
    finish_deadline: 1591940028,
    review_deadline: 1591950028
  };
  const task = createTask(USER1, USER2, taskObj);
  expect(task.getOwner()).toBe(USER1);
  expect(task.getWorker()).toBe(USER2);
  expect(task.getTaskdetails()).toBe(taskObj['task_details']);
  expect(task.getOwnerdeposit()).toBe(taskObj['owner_deposit']);
  expect(task.getWorkerdeposit()).toBe(taskObj['worker_deposit']);
  expect(task.getFinishdeadline()).toBe(taskObj['finish_deadline']);
  expect(task.getReviewdeadline()).toBe(taskObj['review_deadline']);
});

it('create owner update op', async () => {
  const update = {
    task_details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
    owner_deposit: 1000,
    worker_deposit: 100,
    finish_deadline: 1591940028,
    review_deadline: 1591950028
  };
  const op = createOwnerUpdateOp(1, COMMENT, update);
  expect(op.hasOwnerupdate()).toBe(true);
  const requestChangeOp = op.getOwnerupdate();

  expect(requestChangeOp.getIndex()).toBe(1);
  expect(requestChangeOp.getComment()).toBe(COMMENT);
  expect(requestChangeOp.getTaskdetails()).toBe(update['task_details']);
  expect(requestChangeOp.getOwnerdeposit()).toBe(update['owner_deposit']);
  expect(requestChangeOp.getWorkerdeposit()).toBe(update['worker_deposit']);
  expect(requestChangeOp.getFinishdeadline()).toBe(update['finish_deadline']);
  expect(requestChangeOp.getReviewdeadline()).toBe(update['review_deadline']);
});

it('create owner update op with missing fields', async () => {
  const update = {
    worker_deposit: 0,
    finish_deadline: 1591940028
  };
  const op = createOwnerUpdateOp(2, COMMENT, update);
  expect(op.hasOwnerupdate()).toBe(true);
  const requestChangeOp = op.getOwnerupdate();

  expect(requestChangeOp.getIndex()).toBe(2);
  expect(requestChangeOp.getComment()).toBe(COMMENT);

  expect(requestChangeOp.hasTaskdetails()).toBe(false);
  expect(requestChangeOp.hasOwnerdeposit()).toBe(false);
  expect(requestChangeOp.hasReviewdeadline()).toBe(false);

  expect(requestChangeOp.hasWorkerdeposit()).toBe(true);
  expect(requestChangeOp.getWorkerdeposit()).toBe(0);
  expect(requestChangeOp.hasFinishdeadline()).toBe(true);
  expect(requestChangeOp.getFinishdeadline()).toBe(update['finish_deadline']);
});

it('creaet request change op', async () => {
  const update = {
    task_details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
    owner_deposit: 1000,
    worker_deposit: 100,
    finish_deadline: 1591940028,
    review_deadline: 1591950028
  };
  const op = createRequestChangeOp(1, COMMENT, update);
  expect(op.hasRequestchange()).toBe(true);
  const requestChangeOp = op.getRequestchange();

  expect(requestChangeOp.getIndex()).toBe(1);
  expect(requestChangeOp.getComment()).toBe(COMMENT);
  expect(requestChangeOp.getTaskdetails()).toBe(update['task_details']);
  expect(requestChangeOp.getOwnerdeposit()).toBe(update['owner_deposit']);
  expect(requestChangeOp.getWorkerdeposit()).toBe(update['worker_deposit']);
  expect(requestChangeOp.getFinishdeadline()).toBe(update['finish_deadline']);
  expect(requestChangeOp.getReviewdeadline()).toBe(update['review_deadline']);
});

it('creaet request change op with missing fields', async () => {
  const update = {
    worker_deposit: 0,
    finish_deadline: 1591940028
  };
  const op = createRequestChangeOp(2, COMMENT, update);
  expect(op.hasRequestchange()).toBe(true);
  const requestChangeOp = op.getRequestchange();

  expect(requestChangeOp.getIndex()).toBe(2);
  expect(requestChangeOp.getComment()).toBe(COMMENT);

  expect(requestChangeOp.hasTaskdetails()).toBe(false);
  expect(requestChangeOp.hasOwnerdeposit()).toBe(false);
  expect(requestChangeOp.hasReviewdeadline()).toBe(false);

  expect(requestChangeOp.hasWorkerdeposit()).toBe(true);
  expect(requestChangeOp.getWorkerdeposit()).toBe(0);
  expect(requestChangeOp.hasFinishdeadline()).toBe(true);
  expect(requestChangeOp.getFinishdeadline()).toBe(update['finish_deadline']);
});

it('creaet request for final review op', async () => {
  const proof = createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "proof");
  const op = createRequestForFinalReviewOp(1, COMMENT, proof);
  expect(op.hasRequestforfinalreview()).toBe(true);
  const requestForFinalReviewOp = op.getRequestforfinalreview();
  expect(requestForFinalReviewOp.getIndex()).toBe(1);
  expect(requestForFinalReviewOp.getComment()).toBe(COMMENT);
  expect(requestForFinalReviewOp.getProofofwork()).toBe(proof);
});

it('creaet request for final review op without proof and comment', async () => {
  const op = createRequestForFinalReviewOp(2, undefined, undefined);
  expect(op.hasRequestforfinalreview()).toBe(true);
  const requestForFinalReviewOp = op.getRequestforfinalreview();
  expect(requestForFinalReviewOp.getIndex()).toBe(2);
  expect(requestForFinalReviewOp.getComment()).toBe(undefined);
  expect(requestForFinalReviewOp.getProofofwork()).toBe(undefined);
});

it('create worker accept op', async () => {
  const op = createWorkerAcceptOp(1, COMMENT);
  expect(op.hasWorkeraccept()).toBe(true);
  const workerAcceptOp = op.getWorkeraccept();
  expect(workerAcceptOp.getIndex()).toBe(1);
  expect(workerAcceptOp.getComment()).toBe(COMMENT);
});

it('create recall op', async () => {
  const op = createRecallOp(1, COMMENT);
  expect(op.hasRecall()).toBe(true);
  const recallOp = op.getRecall();
  expect(recallOp.getIndex()).toBe(1);
  expect(recallOp.getComment()).toBe(COMMENT);
});

it('create reject op', async () => {
  const op = createRejectOp(1, COMMENT);
  expect(op.hasReject()).toBe(true);
  const rejectOp = op.getReject();
  expect(rejectOp.getIndex()).toBe(1);
  expect(rejectOp.getComment()).toBe(COMMENT);
});

it('create approve op', async () => {
  const op = createApproveOp(1, COMMENT);
  expect(op.hasApprove()).toBe(true);
  const approveOp = op.getApprove();
  expect(approveOp.getIndex()).toBe(1);
  expect(approveOp.getComment()).toBe(COMMENT);
});

it('create quit op', async () => {
  const op = createQuitOp(1, COMMENT);
  expect(op.hasQuit()).toBe(true);
  const quitOp = op.getQuit();
  expect(quitOp.getIndex()).toBe(1);
  expect(quitOp.getComment()).toBe(COMMENT);
});
