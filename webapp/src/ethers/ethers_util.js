import { ethers } from 'ethers';
import {contractABI, contractBytecode} from './ethers_contract.js';

const getSigner = () => {
  return new ethers.providers.Web3Provider(window.web3.currentProvider).getSigner();
}

export const createTask = (task) => {
  if (!task.taskDetails || !task.taskDetails.value) {
  	throw "Missing task detail link.";
  }
  if (!task.worker || !task.worker.ethereumAddress) {
  	throw "Missing worker Address.";
  }
  if (!task.ownerDeposit) {
  	throw "Missing owner deposit amount.";
  }
  if (!task.workerDeposit) {
  	throw "Missing worker deposit amount.";
  }
  if (!task.finishDeadline) {
  	throw "Missing task finish deadline.";
  }
  if (!task.reviewDuration) {
  	throw "Missing task review duration.";
  }
  const signer = getSigner();
  const factory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
  const ownerDepositWei = ethers.utils.parseEther(String(task.ownerDeposit));
  const workerDepositWei = ethers.utils.parseEther(String(task.workerDeposit));
  // Calculates the duration between task.finishDeadline and now() and converts to number of hours.
  const finishDurationHours = Math.floor((task.finishDeadline - Date.now()) / 1000 / 3600);
  return factory.deploy(
  	task.worker.ethereumAddress, task.taskDetails.value, ownerDepositWei,
  	workerDepositWei, finishDurationHours, task.reviewDuration);
}

export const ownerDeposit = (task) => {
  if (!task.taskEthereumAddress) {
    throw "Missing ethereum contract address.";
  }
  if (task.ownerDeposit == 0) {
    throw "Invalid owner depsit amount.";
  }
  const signer = getSigner();
  let contract = new ethers.Contract(task.taskEthereumAddress, contractABI, signer);
  // Add deposit as overrides.
  const weiValue = ethers.utils.parseEther(String(task.ownerDeposit));
  const overrides = { value: weiValue };
  return contract.depositByOwner(overrides).then((tx) => {
    console.log("Transaction: ", tx.hash);
    return tx.wait();
  });

export const workerDeposit = (task) => {
  if (!task.taskEthereumAddress) {
    throw "Missing ethereum contract address.";
  }
  if (task.workerDeposit == 0) {
    throw "Invalid worker depsit amount.";
  }
  const signer = getSigner();
  let contract = new ethers.Contract(task.taskEthereumAddress, contractABI, signer);
  // Add deposit as overrides.
  const weiValue = ethers.utils.parseEther(String(task.workerDeposit));
  const overrides = { value: weiValue };
  return contract.depositByOwner(overrides).then((tx) => {
    console.log("Transaction: ", tx.hash);
    return tx.wait();
  });
}