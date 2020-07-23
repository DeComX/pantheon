import React from "react";
import { Button } from '@material-ui/core';

import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import IpfsContext from '../../ipfs/IpfsContext.js';
import createTask from '../../ethers/ethers_util.js';

const TaskList = () => {
  const {ipfs} = React.useContext(IpfsContext);
  const web3React = useWeb3React();

  // A fake task for testing.
  console.log(ipfs);

  console.log(web3React);


  return (
    <Button color="primary">Hello World</Button>
  );
}

export default TaskList;
