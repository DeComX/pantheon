const model = require('../proto/model_pb.js');

export const create = (owner, worker, taskObj) => {
  const task = new model.Task();
  task.setOwner(owner);
  task.setWorker(worker);
  task.setTaskDetails(taskObj['details']);
  task.setOwnerDeposit(taskObj['owner_deposit']);
  task.setWorkerDeposit(taskObj['worker_deposit']);
  task.setFinishDeadline(taskObj['finish_deadline']);
  task.setReviewDeadline(taskObj['review_deadline']);
  return task;
}

export const createOwnerUpdateOp = (index, comment, update) => {
  const taskOp = new model.TaskOp();
  const op = new model.OwnerUpdateOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  if (update['details'] !== undefined) {
    op.setTaskDetails(update['details']);
  }
  if (update['owner_deposit'] !== undefined) {
    op.setOwnerDeposit(update['owner_deposit']);
  }
  if (update['worker_deposit'] !== undefined) {
    op.setWorkerDeposit(update['worker_deposit']);
  }
  if (update['finish_deadline'] !== undefined) {
    op.setFinishDeadline(update['finish_deadline']);
  }
  if (update['review_deadline'] !== undefined) {
    op.setReviewDeadline(update['review_deadline']);
  }
  taskOp.setOwnerUpdate(op);
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
  taskOp.setWorkerAccept(op)
  return taskOp;
}

export const createRequestChangeOp = (index, comment, update) => {
  const taskOp = new model.TaskOp();
  const op = new model.RequestChangeOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  if (update['details']) {
    op.setTaskDetails(update['details']);
  }
  // owner deposit could be 0
  if (update['owner_deposit'] !== undefined) {
    op.setOwnerDeposit(update['owner_deposit']);
  }
  // worker deposit could be 0
  if (update['worker_deposit'] !== undefined) {
    op.setWorkerDeposit(update['worker_deposit']);
  }
  if (update['finish_deadline'] !== undefined) {
    op.setFinishDeadline(update['finish_deadline']);
  }
  if (update['review_deadline'] != undefined) {
    op.setReviewDeadline(reviewDeadline);
  }
  taskOp.setRequestChange(op)
  return taskOp;
}

export const createRequestForFinalReviewOp = (
  index, comment, proofOfWork
) => {
  const taskOp = new model.TaskOp();
  const op = new model.RequestForFinalReviewOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  if (proofOfWork) {
    op.setProofOfWork(proofOfWork);
  }
  taskOp.setRequestForFinalReview(op)
  return taskOp;
}

export const createRecallOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.RecallOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  taskOp.setRecallOp(op)
  return taskOp;
}

export const createRejectOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.RejectOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  taskOp.RejectOp(op)
  return taskOp;
}

export const createApproveOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.ApproveOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  taskOp.ApproveOp(op)
  return taskOp;
}

export const createQuitOp = (index, comment) => {
  const taskOp = new model.TaskOp();
  const op = new model.QuitOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  taskOp.QuitOp(op)
  return taskOp;
}
