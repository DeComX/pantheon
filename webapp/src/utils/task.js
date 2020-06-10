const model = require('../../proto/model_pb.js');

export const create = (
  owner, worker, details, ownerDeposit,
  workerDeposit, finishDeadline, reviewDeadline
) => {
  const task = new model.Task();
  task.setOwner(owner);
  task.setWorker(worker);
  details.setTaskDetails(details);
  details.setOwnerDeposit(ownerDeposit);
  details.setWorkerDeposit(workerDeposit);
  details.setFinishDeadline(finishDeadline);
  details.setReviewDeadline(reviewDeadline);
  return task;
}

export const createOwnerUpdateOp = (
  index, comment, details, ownerDeposit,
  workerDeposit, finishDeadline, reviewDeadline
) => {
  const taskOp = new model.TaskOp();
  const op = new model.OwnerUpdateOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  if (details) {
    op.setTaskDetails(details);
  }
  if (ownerDeposit) {
    op.setOwnerDeposit(ownerDeposit);
  }
  if (workerDeposit) {
    op.setWorkerDeposit(workerDeposit);
  }
  if (finishDeadline) {
    op.setFinishDeadline(finishDeadline);
  }
  if (reviewDeadline) {
    op.setReviewDeadline(reviewDeadline);
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

export const createRequestChangeOp = (
  index, comment, details, ownerDeposit,
  workerDeposit, finishDeadline, reviewDeadline
) => {
  const taskOp = new model.TaskOp();
  const op = new model.RequestChangeOp();
  op.setIndex(index); // required
  if (comment) {
    op.setComment(comment);
  }
  if (details) {
    op.setTaskDetails(details);
  }
  if (ownerDeposit) {
    op.setOwnerDeposit(ownerDeposit);
  }
  if (workerDeposit) {
    op.setWorkerDeposit(workerDeposit);
  }
  if (finishDeadline) {
    op.setFinishDeadline(finishDeadline);
  }
  if (reviewDeadline) {
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
