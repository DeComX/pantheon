import { ethers } from 'ethers';
import {contractABI, contractBytecode} from './ethers_contract.js';

//const model = require('../proto/model_pb.js');

const createTask = (task) => {
  const signer = new ethers.providers.Web3Provider(window.web3.currentProvider).getSigner();
  const factory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
  return factory.deploy(task.taskDetails.value, task.worker.ethereumAddress, task.workerDeposit, 1, 1).then((contract) => {
  	return contract.address;
  });
}

export default createTask;