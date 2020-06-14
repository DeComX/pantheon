import React from "react";

import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import IpfsContext from '../../ipfs/IpfsContext.js';
import createTask from '../../ethers/ethers_util.js';

const TaskList = () => {
  const {ipfs, ipfsId} = React.useContext(IpfsContext);
  const web3React = useWeb3React();

  // A fake task for testing.
  console.log(ipfs);
  console.log(ipfsId);

  console.log(web3React);

  const task = new model.Task();
  task.taskDetails = new model.LinkedData();
  task.taskDetails.value = "Fake link1";
  task.worker = new model.User();
  task.worker.ethereumAddress = "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E";
  task.workerDeposit = 1;
  createTask(task).then((contractAddr) => console.log('https://ropsten.etherscan.io/address/' + contractAddr));


  return (
    <div></div>
  );
}

export default TaskList;
