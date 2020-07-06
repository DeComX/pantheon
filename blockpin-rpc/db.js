const timestampKey = (address) => {
  return address + "_timestamp_us";
};

const lockKey = (address) => {
  return address + "_lock";
};

exports.getTimestamp = (db, address) => {
  const key = timestampKey(address);
  return new Promise((resolve, reject) => {
    db.get(key, (err, timestampUs) => {
      if (err) {
        if (err.notFound) {
          resolve(0); // starting from 0
        } else {
          console.log("timestamp read error: ", key);
          reject("database read error");
        }
      }
      resolve(timestampUs);
    });
  });
};

exports.updateTimestamp = (db, address, timestampUs) => {
  const key = timestampKey(address);
  return new Promise((resolve, reject) => {
    db.put(key, timestampUs, (err) => {
      if (err) {
        console.log("timestamp update error: ", key, timestampUs);
        reject("database write error");
      }
      resolve(timestampUs);
    });
  });
};

exports.getLock = (db, address) => {
  const key = lockKey(address);
  return new Promise((resolve, reject) => {
    db.get(key, (err, locked) => {
      if (err) {
        if (err.notFound) {
          resolve(true); // no lock == unlock
        } else {
          console.log("lock read error: ", key);
          reject("database read error");
        }
      }
      resolve(timestampUs);
    });
  });
};

exports.addLock = (db, address) => {
  const key = lockKey(address);
  return new Promise((resolve, reject) => {
    db.put(key, true, (err) => {
      if (err) {
        console.log("add lock error: ", key);
        reject("database write error");
      }
      resolve();
    });
  });
}

exports.releaseLock = (db, address) => {
  const key = lockKey(address);
  return new Promise((resolve, reject) => {
    db.put(key, false, (err) => {
      if (err) {
        console.log("release lock error: ", key);
        reject("database write error");
      }
      resolve();
    });
  });
}
