import React from "react";

import { useWeb3React } from '@web3-react/core';
import IpfsContext from '../../ipfs/IpfsContext.js';

const model = require('../../proto/model_pb.js');

const TaskList = () => {
  const {ipfs, ipfsId} = React.useContext(IpfsContext);
  const web3React = useWeb3React();

  console.log(ipfs);
  console.log(ipfsId);
  console.log(web3React);

  const task = new model.Task();
  task.setTitle("Title");
  console.log(task);

  return (
    <div></div>
  );
}

export default TaskList;
