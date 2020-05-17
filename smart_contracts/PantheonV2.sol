pragma solidity ^0.4.26;

import "./SafeMath.sol";

contract PantheonTask {
    using  SafeMath for uint256;
    
    enum TaskStatus {
        New,
        Accepted,
        Completed,
        Closed
    }
    
    struct Resource {
        string name;
        bytes32 hash;
        string link;
        address uploader;
    }

    string name;
    string description;
    uint ownerDeposite;
    uint workerDeposite;
    address owner;
    address worker;
    TaskStatus status;
    mapping(uint => Resource) resources;
    uint nextResoureId;
    uint256 deadline;
    uint256 completeTime;
    
    constructor(string contractName, string contractdesp, uint ownerDpot, address workerAddr, uint workerDpot, uint durationDays) public payable {
        require(msg.value == ownerDeposite);
        owner = msg.sender;
        name = contractName;
        description = contractdesp;
        ownerDeposite = ownerDpot;
        worker = workerAddr;
        workerDeposite = workerDpot;
        status = TaskStatus.New;
        deadline = now + (durationDays * 1 days);
        completeTime = 0;
        nextResoureId = 0;
    }
    
    function acceptTask(uint taskId) public payable {
        require(msg.value == workerDeposite);
        require(msg.sender == worker);
        status =  TaskStatus.Accepted;
    }
    
    function markAsCompleted(uint taskId, string proofName, string proofLink, bytes32 proofHash) public {
        require(msg.sender == worker);
        resources[nextResoureId] = Resource({
            name: proofName,
            hash: proofHash,
            link: proofLink,
            uploader: msg.sender
        });
        nextResoureId += 1;
        status = TaskStatus.Completed;
        completeTime = now;
    }
    
    function confirmTaskCompleted(uint taskId) public returns (bool) {
        require(msg.sender == owner);
        require(status == TaskStatus.Completed);
        status = TaskStatus.Closed;
        selfdestruct(worker);
    }
    
    function cancelUnacceptedTask(uint taskId) public returns (bool) {
        require(msg.sender == owner);
        require(status == TaskStatus.New);
        selfdestruct(owner);
    }
    
    function cancelOverdueTask(uint taskId) public returns (bool) {
        require(msg.sender == owner);
        require(status == TaskStatus.Accepted);
        require(deadline < now);
        selfdestruct(owner);
    }
}
