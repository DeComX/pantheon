import { validateTask, validateTaskOp } from './validator';

const model = require('../proto/model_pb.js');

export const createTask = (owner, worker, taskObj) => {
  const task = new model.Task();
  task.setOwner(owner);
  task.setWorker(worker);
  task.setTaskdetails(taskObj['task_details']);
  task.setOwnerdeposit(taskObj['owner_deposit']);
  task.setWorkerdeposit(taskObj['worker_deposit']);
  task.setFinishdeadline(taskObj['finish_deadline']);
  task.setReviewdeadline(taskObj['review_deadline']);
  validateTask(task);
  return task;
}

// TODO: distinguish unset and reset for integer fields
export const createOwnerUpdateOp = (index, comment, update) => {
  const taskOp = new model.TaskOp();
  const op = new model.OwnerUpdateOp();
  op.setIndex(index); // required
  if (comment !== undefined) {
    op.setComment(comment);
  }
  if (update['task_details'] !== undefined) {
    op.setTaskdetails(update['task_details']);
  }
  if (update['owner_deposit'] !== undefined) {
    op.setOwnerdeposit(update['owner_deposit']);
  }
  if (update['worker_deposit'] !== undefined) {
    op.setWorkerdeposit(update['worker_deposit']);
  }
  if (update['finish_deadline'] !== undefined) {
    op.setFinishdeadline(update['finish_deadline']);
  }
  if (update['review_deadline'] !== undefined) {
    op.setReviewdeadline(update['review_deadline']);
  }
  taskOp.setOwnerupdate(op);
  validateTaskOp(taskOp);
  return taskOp;
}

export const createWorkerAcceptOp = (
  index, comment
) => {
  const taskOp = new model.TaskOp();
  const op = new model.WorkerAcceptOp();
  op.setIndex(index); // required
  if (comment !== undefined) {
    op.setComment(comment);
  }
  taskOp.setWorkeraccept(op);
  validateTaskOp(taskOp);
  return taskOp;
}

// TODO: distinguish unset and reset for integer fields
export const createRequestChangeOp = (index, comment, update) => {
  const taskOp = new model.TaskOp();
  const op = new model.RequestChangeOp();
  op.setIndex(index); // required
  if (comment !== undefined) {
    op.setComment(comment);
  }
  if (update['task_details'] !== undefined) {
    op.setTaskdetails(update['task_details']);
  }
  if (update['owner_deposit'] !== undefined) {
    op.setOwnerdeposit(update['owner_deposit']);
  }
  if (update['worker_deposit'] !== undefined) {
    op.setWorkerdeposit(update['worker_deposit']);
  }
  if (update['finish_deadline'] !== undefined) {
    op.setFinishdeadline(update['finish_deadline']);
  }
  if (update['review_deadline'] != undefined) {
    op.setReviewdeadline(update['review_deadline']);
  }
  taskOp.setRequestchange(op)
  validateTaskOp(taskOp);
  return taskOp;
}

export const createRequestForFinalReviewOp = (index, comment, proofOfWork) => {
  const taskOp = new model.TaskOp();
  const op = new model.RequestForFinalReviewOp();
  op.setIndex(index); // required
  if (comment !== undefined) {
    op.setComment(comment);
  }
  if (proofOfWork !== undefined) {
    op.setProofofwork(proofOfWork);
  }
  taskOp.setRequestforfinalreview(op)
  validateTaskOp(taskOp);
  return taskOp;
}

export const createRecallOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.RecallOp();
  op.setIndex(index); // required
  if (comment !== undefined) {
    op.setComment(comment);
  }
  taskOp.setRecall(op)
  validateTaskOp(taskOp);
  return taskOp;
}

export const createRejectOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.RejectOp();
  op.setIndex(index); // required
  if (comment !== undefined) {
    op.setComment(comment);
  }
  taskOp.setReject(op)
  validateTaskOp(taskOp);
  return taskOp;
}

export const createApproveOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.ApproveOp();
  op.setIndex(index); // required
  if (comment !== undefined) {
    op.setComment(comment);
  }
  taskOp.setApprove(op)
  validateTaskOp(taskOp);
  return taskOp;
}

export const createQuitOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.QuitOp();
  op.setIndex(index); // required
  if (comment !== undefined) {
    op.setComment(comment);
  }
  taskOp.setQuit(op)
  validateTaskOp(taskOp);
  return taskOp;
}
