pragma solidity ^0.4.26;

import "./SafeMath.sol";

contract PantheonTask {
    using  SafeMath for uint256;
    
    enum TaskStatus {
        PendingAccept,
        PendingWorkerProof,
        PendingChangeReview,
        PendingFinalReview,
        Closed
    }

    string taskDetailLink;
    address owner;
    address worker;
    uint workerDeposite;
    TaskStatus status;
    uint256 finishDeadline;
    uint256 completeTime;
    uint reviewDurationDays;
    string proofOfWorkLink;
    
    constructor(string taskLink, address workerAddr, uint workerDepot, uint workDurationDays, uint reviewDays) public payable {
        owner = msg.sender;
        taskDetailLink = taskLink;
        worker = workerAddr;
        workerDeposite = workerDepot;
        status = TaskStatus.PendingAccept;
        finishDeadline = now + (workDurationDays * 1 days);
        reviewDurationDays = reviewDays;
    }
}