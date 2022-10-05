const aes256 = require("aes256");

const key = process.env.REACT_APP_ENCRYPTION_KEY;

const encrypt = (text) => {
  const encrypted = aes256.encrypt(key, text);

  return encrypted;
};

const decrypt = (encrypted) => {
  const decrypted = aes256.decrypt(key, encrypted);

  return decrypted;
};

export { encrypt, decrypt };
