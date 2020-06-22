export const uploadUserInfo = async (ipfs, user) => {
  await ipfs.add(user.serializeBinary());
};

export const uploadTask = async (ipfs, task) => {
  await ipfs.add(task.serializeBinary());
};
