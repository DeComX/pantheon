const nonceKey = (address) => {
  return address + "_nonce";
};

const getNonce = (db, address) => {
  const key = nonceKey(address);
  return new Promise((resolve, reject) => {
    db.get(key).then((err, nonce) => {
      if (err) {
        if (err.notFound) {
          resolve(0); // starting from 0
        } else {
          console.log("nonce read error: ", key);
          reject({
            code: 'SERVER_ERROR', message: "database read error"
          });
        }
      }
      resolve(nonce);
    });
  });
};

const updateNonce = (db, address, nonce) => {
  const key = nonceKey(address);
  return new Promise((resolve, reject) => {
    db.put(key, nonce, (err) => {
      if (err) {
        console.log("nonce update error: ", key, nonce);
        reject({
          code: 'SERVER_ERROR', message: "database write error"
        });
      }
      resolve(nonce);
    });
  });
};
