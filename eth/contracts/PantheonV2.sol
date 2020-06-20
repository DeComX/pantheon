pragma solidity ^0.4.26;

import "./SafeMath.sol";

contract PantheonTask {
    using  SafeMath for uint256;
    
    enum TaskStatus {
        PendingOwnerDeposit,
        PendingAccept,
        PendingWorkerProof,
        PendingChangeReview,
        PendingFinalReview,
        Closed
    }

    string taskDetailLink;
    address owner;
    address worker;
    uint ownerDeposit;
    uint workerDeposit;
    TaskStatus status;
    uint256 finishDeadline;
    uint256 completeTime;
    uint reviewDurationDays;
    string proofOfWorkLink;
    
    constructor(address workerAddr, string taskLink, uint ownerDepot, uint workerDepot, uint workDurationHours, uint reviewDays) public {
        taskDetailLink = taskLink;
        owner = msg.sender;
        worker = workerAddr;
        ownerDeposit = ownerDepot;
        workerDeposit = workerDepot;
        status = TaskStatus.PendingOwnerDeposit;
        finishDeadline = now + (workDurationHours * 1 hours);
        reviewDurationDays = reviewDays;
    }

    function depositByOwner() public payable {
        require(status == TaskStatus.PendingOwnerDeposit);
        require(msg.sender == owner);
        require(msg.value == ownerDeposit);
        status = TaskStatus.PendingAccept;
    }

    function acceptByWorker() public payable {
        require(status == TaskStatus.PendingAccept);
        require(msg.sender == worker);
        require(msg.value == workerDeposit);
        status = TaskStatus.PendingWorkerProof;
    }
}