const model = require('../proto/model_pb.js');

export const createTask = (owner, worker, taskObj) => {
  const task = new model.Task();
  task.setOwner(owner);
  task.setWorker(worker);
  task.setTaskdetails(taskObj['details']);
  task.setOwnerdeposit(taskObj['owner_deposit']);
  task.setWorkerdeposit(taskObj['worker_deposit']);
  task.setFinishdeadline(taskObj['finish_deadline']);
  task.setReviewdeadline(taskObj['review_deadline']);
  return task;
}

// TODO: distinguish unset and reset for integer fields
export const createOwnerUpdateOp = (index, comment, update) => {
  const taskOp = new model.TaskOp();
  const op = new model.OwnerUpdateOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  if (update['details'] !== undefined) {
    op.setTaskdetails(update['details']);
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
  return taskOp;
}

export const createWorkerAcceptOp = (
  index, comment
) => {
  const taskOp = new model.TaskOp();
  const op = new model.WorkerAcceptOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  taskOp.setWorkeraccept(op)
  return taskOp;
}

// TODO: distinguish unset and reset for integer fields
export const createRequestChangeOp = (index, comment, update) => {
  const taskOp = new model.TaskOp();
  const op = new model.RequestChangeOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  if (update['details']) {
    op.setTaskdetails(update['details']);
  }
  // owner deposit could be 0
  if (update['owner_deposit'] !== undefined) {
    op.setOwnerdeposit(update['owner_deposit']);
  }
  // worker deposit could be 0
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
  return taskOp;
}

export const createRequestForFinalReviewOp = (index, comment, proofOfWork) => {
  const taskOp = new model.TaskOp();
  const op = new model.RequestForFinalReviewOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  if (proofOfWork) {
    op.setProofofwork(proofOfWork);
  }
  taskOp.setRequestforfinalreview(op)
  return taskOp;
}

export const createRecallOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.RecallOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  taskOp.setRecall(op)
  return taskOp;
}

export const createRejectOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.RejectOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  taskOp.setReject(op)
  return taskOp;
}

export const createApproveOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.ApproveOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  taskOp.setApprove(op)
  return taskOp;
}

export const createQuitOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.QuitOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  taskOp.setQuit(op)
  return taskOp;
}
