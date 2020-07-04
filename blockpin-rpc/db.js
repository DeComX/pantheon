const timestampKey = (address) => {
  return address + "_timestamp_us";
};

const getTimestamp = (db, address) => {
  const key = timestampKey(address);
  return new Promise((resolve, reject) => {
    db.get(key).then((err, timestampUs) => {
      if (err) {
        if (err.notFound) {
          resolve(0); // starting from 0
        } else {
          console.log("timestamp read error: ", key);
          reject({
            code: 'SERVER_ERROR', message: "database read error"
          });
        }
      }
      resolve(timestampUs);
    });
  });
};

const updateTimestamp = (db, address, timestampUs) => {
  const key = timestampKey(address);
  return new Promise((resolve, reject) => {
    db.put(key, timestampUs, (err) => {
      if (err) {
        console.log("timestamp update error: ", key, timestampUs);
        reject({
          code: 'SERVER_ERROR', message: "database write error"
        });
      }
      resolve(timestampUs);
    });
  });
};
