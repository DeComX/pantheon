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
  ethereumAddress: "0xd115bffabbdd893a6f7cea402e7338643ced44a6",
  name: "User1",
  task_details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
  contacts: [createContact(model.Contact.ContactType.OTHER, "other")]
});
const USER2 = createUser({
  ethereumAddress: "0xd115bffabbdd893a6f7cea402e7338643ced55a7",
  name: "User2"
});

it('create task', async () => {
  const taskObj = {
    task_details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
    owner_deposit_wei: 1000,
    worker_deposit_wei: 100,
    deadline_hours: 1591940028
  };
  const task = createTask(USER1, USER2, taskObj);
  expect(task.getOwner()).toBe(USER1);
  expect(task.getWorker()).toBe(USER2);
  expect(task.getTaskdetails()).toBe(taskObj['task_details']);
  expect(task.getOwnerdepositwei()).toBe(taskObj['owner_deposit_wei']);
  expect(task.getWorkerdepositwei()).toBe(taskObj['worker_deposit_wei']);
  expect(task.getDeadlinehours()).toBe(taskObj['deadline_hours']);
  expect(task.getStatus()).toBe(model.Task.TaskStatus.DRAFT);
});

it('create owner update op', async () => {
  const update = {
    task_details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
    owner_deposit_wei: 1000,
    worker_deposit_wei: 100,
    deadline_hours: 1591940028
  };
  const op = createOwnerUpdateOp(1, COMMENT, update);
  expect(op.hasOwnerupdate()).toBe(true);
  const ownerUpdateOp = op.getOwnerupdate();

  expect(ownerUpdateOp.getIndex()).toBe(1);
  expect(ownerUpdateOp.getComment()).toBe(COMMENT);
  expect(ownerUpdateOp.getTaskdetails()).toBe(update['task_details']);
  expect(ownerUpdateOp.getOwnerdepositwei()).toBe(update['owner_deposit_wei']);
  expect(ownerUpdateOp.getWorkerdepositwei()).toBe(update['worker_deposit_wei']);
  expect(ownerUpdateOp.getDeadlinehours()).toBe(update['deadline_hours']);
});

it('create owner update op with missing fields', async () => {
  const update = {
    worker_deposit_wei: 0,
    deadline_hours: 1591940028
  };
  const op = createOwnerUpdateOp(2, COMMENT, update);
  expect(op.hasOwnerupdate()).toBe(true);
  const ownerUpdateOp = op.getOwnerupdate();

  expect(ownerUpdateOp.getIndex()).toBe(2);
  expect(ownerUpdateOp.getComment()).toBe(COMMENT);

  expect(ownerUpdateOp.hasTaskdetails()).toBe(false);
  expect(ownerUpdateOp.hasOwnerdepositwei()).toBe(false);

  expect(ownerUpdateOp.hasWorkerdepositwei()).toBe(true);
  expect(ownerUpdateOp.getWorkerdepositwei()).toBe(0);
  expect(ownerUpdateOp.hasDeadlinehours()).toBe(true);
  expect(ownerUpdateOp.getDeadlinehours()).toBe(update['deadline_hours']);
});

it('creaet request change op', async () => {
  const update = {
    task_details: createLinkedData(model.LinkedData.DataType.PLAIN_TEXT, "abc"),
    owner_deposit_wei: 1000,
    worker_deposit_wei: 100,
    deadline_hours: 1591940028
  };
  const op = createRequestChangeOp(1, COMMENT, update);
  expect(op.hasRequestchange()).toBe(true);
  const requestChangeOp = op.getRequestchange();

  expect(requestChangeOp.getIndex()).toBe(1);
  expect(requestChangeOp.getComment()).toBe(COMMENT);
  expect(requestChangeOp.getTaskdetails()).toBe(update['task_details']);
  expect(requestChangeOp.getOwnerdepositwei()).toBe(update['owner_deposit_wei']);
  expect(requestChangeOp.getWorkerdepositwei()).toBe(update['worker_deposit_wei']);
  expect(requestChangeOp.getDeadlinehours()).toBe(update['deadline_hours']);
});

it('creaet request change op with missing fields', async () => {
  const update = {
    worker_deposit_wei: 0,
    deadline_hours: 1591940028
  };
  const op = createRequestChangeOp(2, COMMENT, update);
  expect(op.hasRequestchange()).toBe(true);
  const requestChangeOp = op.getRequestchange();

  expect(requestChangeOp.getIndex()).toBe(2);
  expect(requestChangeOp.getComment()).toBe(COMMENT);

  expect(requestChangeOp.hasTaskdetails()).toBe(false);
  expect(requestChangeOp.hasOwnerdepositwei()).toBe(false);

  expect(requestChangeOp.hasWorkerdepositwei()).toBe(true);
  expect(requestChangeOp.getWorkerdepositwei()).toBe(0);
  expect(requestChangeOp.hasDeadlinehours()).toBe(true);
  expect(requestChangeOp.getDeadlinehours()).toBe(update['deadline_hours']);
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
