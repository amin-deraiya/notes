const CryptoJS = require('crypto-js');

const secretKey = process.env.SECRET_KEY

// Function to encrypt data using a secret key
export const encode = (data: string) => {
  var ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
  return ciphertext
};

// Function to decrypt data using a secret key
export const decode = (data: string) => {
  var bytes  = CryptoJS.AES.decrypt(data, secretKey);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText
};
