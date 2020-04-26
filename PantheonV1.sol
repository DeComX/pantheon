pragma solidity ^0.4.26;

import "./SafeMath.sol";

contract Pantheon {
    using  SafeMath for uint256;
    
    enum TaskStatus {
        New,
        Assigned,
        Accepted,
        Completed,
        Closed,
        Cancelled
    }
    
    struct Resource {
        string name;
        bytes32 hash;
        string link;
        address uploader;
    }
    
    struct Task {
        uint id;
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
    }
    
    mapping(uint => Task) tasks;
    uint nextTaskId;
    
    constructor() public {
        nextTaskId = 0;
    }
    
    function createTask(string name, string description, uint ownerDeposite, uint workerDeposite, uint durationDays) public payable {
        require(msg.value == ownerDeposite);
        tasks[nextTaskId] = Task({
            id: nextTaskId,
            name: name,
            description: description,
            ownerDeposite: ownerDeposite,
            workerDeposite: workerDeposite,
            owner: msg.sender,
            worker: address(0),
            status: TaskStatus.New,
            deadline: now + (durationDays * 1 days),
            completeTime: 0,
            nextResoureId: 0
        });
        nextTaskId += 1;
    }
    
    function assignWorker(uint taskId, address worker) public {
        require(msg.sender == tasks[taskId].owner);
        require(tasks[taskId].status == TaskStatus.New || tasks[taskId].status == TaskStatus.Assigned);
        tasks[taskId].worker = worker;
        tasks[taskId].status = TaskStatus.Assigned;
    }
    
    function acceptTask(uint taskId) public payable {
        require(msg.value == tasks[taskId].workerDeposite);
        require(msg.sender == tasks[taskId].worker);
        tasks[taskId].status =  TaskStatus.Accepted;
    }
    
    function markAsCompleted(uint taskId, string proofName, string proofLink, bytes32 proofHash) public {
        require(msg.sender == tasks[taskId].worker);
        tasks[taskId].resources[tasks[taskId].nextResoureId] = Resource({
            name: proofName,
            hash: proofHash,
            link: proofLink,
            uploader: msg.sender
        });
        tasks[taskId].nextResoureId += 1;
        tasks[taskId].status = TaskStatus.Completed;
        tasks[taskId].completeTime = now;
    }
    
    function confirmTaskCompleted(uint taskId) public returns (bool) {
        require(msg.sender == tasks[taskId].owner);
        require(tasks[taskId].status == TaskStatus.Completed);
        tasks[taskId].status = TaskStatus.Closed;
        return msg.sender.call.value(tasks[taskId].ownerDeposite + tasks[taskId].workerDeposite)();
    }
    
    function cancelTask(uint taskId) public returns (bool) {
        require(msg.sender == tasks[taskId].owner);
        require(tasks[taskId].deadline < now);
        require(tasks[taskId].status == TaskStatus.New ||
            tasks[taskId].status == TaskStatus.Assigned ||
            tasks[taskId].status == TaskStatus.Accepted);
        uint totalDeposite = tasks[taskId].ownerDeposite;
        if (tasks[taskId].status == TaskStatus.Accepted) {
            totalDeposite += tasks[taskId].workerDeposite;
        }
        tasks[taskId].status = TaskStatus.Cancelled;
        return msg.sender.call.value(totalDeposite)();
    }
}
