import { validateTask, validateTaskOp } from './validator';

const model = require('../proto/model_pb.js');

export const createTask = (owner, worker, taskObj) => {
  const task = new model.Task();
  task.setOwner(owner);
  task.setWorker(worker);
  task.setTaskdetails(taskObj['task_details']);
  task.setOwnerdepositwei(taskObj['owner_deposit_wei']);
  task.setWorkerdepositwei(taskObj['worker_deposit_wei']);
  task.setDeadlinehours(taskObj['deadline_hours']);
  task.setStatus(model.Task.TaskStatus.DRAFT);
  validateTask(task);
  return task;
}

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
  if (update['owner_deposit_wei'] !== undefined) {
    op.setOwnerdepositwei(update['owner_deposit_wei']);
  }
  if (update['worker_deposit_wei'] !== undefined) {
    op.setWorkerdepositwei(update['worker_deposit_wei']);
  }
  if (update['deadline_hours'] !== undefined) {
    op.setDeadlinehours(update['deadline_hours']);
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
  if (update['owner_deposit_wei'] !== undefined) {
    op.setOwnerdepositwei(update['owner_deposit_wei']);
  }
  if (update['worker_deposit_wei'] !== undefined) {
    op.setWorkerdepositwei(update['worker_deposit_wei']);
  }
  if (update['deadline_hours'] !== undefined) {
    op.setDeadlinehours(update['deadline_hours']);
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
