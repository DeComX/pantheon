import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { ethers } from 'ethers';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';

import IpfsProvider from './ipfs/IpfsProvider.js';

import TaskList from "./components/task/TaskList";
import NewTask from "./components/task/NewTask";
import TaskDetails from "./components/task/TaskDetails";
import UserList from "./components/user/UserList";
import UserProfileReadOnly from "./components/user/UserProfileReadOnly";
import UserProfile from "./components/user/UserProfile";

function getLibrary(): Web3Provider {
  const library = new ethers.providers.Web3Provider(
      window.web3.currentProvider);
  library.pollingInterval = 12000;
  return library;
}

const App = (props) => {
  //Context definition: https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#overview
  const context = useWeb3React();
  const { active, activate, deactivate } = context;
  const [connectError, setConnectError] = useState(null);

  useEffect(() => {
    if (!active) {
      const connector = new InjectedConnector({ supportedChainIds: [1, 3, 5777] });
      activate(connector, (error) => {
        setConnectError(error);
      });
    }

    return function cleanup() {
      if (active) {
        deactivate();
      }
    };
  });

  if (active) {
    return (
      <Router>
        <Switch>
          <Route exact path="/tasks" component={TaskList} />
          <Route exact path="/newtask" component={NewTask}/>
          <Route path="/task/:id" component={TaskDetails}/>

          <Route exact path="/users" component={UserList} />
          <Route path="/user/:id" component={UserProfileReadOnly}/>
          <Route exact path="/profile" component={UserProfile} />

          <Route component={TaskList} />
        </Switch>
      </Router>
    );
  } else {
    return (
      <div className="row">
        <div className="col s12 center-align">
          <p className="flow-text grey-text text-darken-1">
            Connecting to ethereum...
          </p>
          <br />
          {connectError && (
             <div className='bg-yellow pa4 mw7 center mv4 white'>
               Ethereum Connect Error: {connectError}
             </div>
           )}
        </div>
      </div>
    );
  }
}

export default function() {
  return (
    <IpfsProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </IpfsProvider>
  );
}
