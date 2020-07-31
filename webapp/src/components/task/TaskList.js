import React, {useState} from "react";
import { Button } from '@material-ui/core';

import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import IpfsContext from '../../ipfs/IpfsContext.js';
import createTask from '../../ethers/ethers_util.js';




const TaskList = ({ifMyTask = true, ifOwnedTask = true}) => {

  const {ipfs} = React.useContext(IpfsContext);
  const web3React = useWeb3React();
  // A fake task for testing.
    console.log(ifMyTask);
    console.log(ifOwnedTask);

  // const [ifMyTask, setIfMyTask] = useState(true);
  // const [ifOwnedTask, setIfOwnedTask] = useState(true);

  return (
    <Button color="primary">Hello World</Button>
  );

}

export default TaskList;
