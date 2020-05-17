import React from 'react';
import { useEffect, useState } from 'react';

import IPFS from 'ipfs';
import IpfsContext from './IpfsContext.js';

const IpfsProvider = (props) => {
  const [ipfs, setIpfs] = useState(null);
  const [ipfsId, setIpfsId] = useState(null);
  const [ipfsInitError, setIpfsInitError] = useState(null);

  useEffect(() => {
    if (ipfs) {
      console.log('IPFS already started')
    } else {
      try {
        console.time('IPFS Started');
        IPFS.create().then(ipfs => {
          console.timeEnd('IPFS Started');
          setIpfs(ipfs);
          ipfs.id().then(value => setIpfsId(value));
        });
      } catch (error) {
        console.error('IPFS init error:', error);
        setIpfsInitError(error)
      }
    }

    return () => {
      if (ipfs && ipfs.stop) {
        console.log('Stopping IPFS');
        ipfs.stop().catch(err => console.error(err));
        setIpfs(null);
        setIpfsId(null);
        setIpfsInitError(null);
      }
    }
  }, [ipfs]);

  if (ipfs === null) {
    return (
      <div className="row">
        <div className="col s12 center-align">
          <p className="flow-text grey-text text-darken-1">
            Loading Ipfs...
          </p>
          <br />
          {ipfsInitError && (
             <div className='bg-yellow pa4 mw7 center mv4 white'>
               Ipfs init error: {ipfsInitError.message || ipfsInitError}
             </div>
           )}
        </div>
      </div>
    );
  } else {
    return (
      <IpfsContext.Provider value={{ipfs, ipfsId}}>
        {props.children}
      </IpfsContext.Provider>
    );
  }
}

export default IpfsProvider
