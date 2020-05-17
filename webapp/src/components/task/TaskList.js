import React from "react";

import { useWeb3React } from '@web3-react/core'
import IpfsContext from '../../ipfs/IpfsContext.js'

const TaskList = () => {
  const {ipfs, ipfsId} = React.useContext(IpfsContext);
  const web3React = useWeb3React();

  console.log(ipfs);
  console.log(ipfsId);
  console.log(web3React);
  return (
    <div></div>
  );
}

export default TaskList;
