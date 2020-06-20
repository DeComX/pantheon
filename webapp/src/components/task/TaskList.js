import React from "react";

import IpfsContext from '../../ipfs/IpfsContext.js';
import {createTask, ownerDeposit} from '../../ethers/ethers_util.js';

const model = require('../../proto/model_pb.js');

const TaskList = () => {
  const {ipfs, ipfsId} = React.useContext(IpfsContext);

  // A fake task for testing.
  console.log(ipfs);
  console.log(ipfsId);

  const task = new model.Task();
  task.taskDetails = new model.LinkedData();
  task.taskDetails.value = "Fake link1";
  task.worker = new model.User();
  task.worker.ethereumAddress = "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E";
  task.ownerDeposit = 0.5;
  task.workerDeposit = 0.2;
  task.finishDeadline = 1593561600000; /* 2020-06-30 usec */
  task.reviewDuration = 2;


  // Sample for the owner to create a task and deposit.
  createTask(task).then((contract) => {
    console.log('https://ropsten.etherscan.io/address/' + contract.address);
    contract.deployed().then(() => {
      task.taskEthereumAddress = contract.address;
      ownerDeposit(task).then((r) => {
        console.log("Completed!");
        console.log(r);
      });
    });
  });

  return (
    <div></div>
  );
}

export default TaskList;
