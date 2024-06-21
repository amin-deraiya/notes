const crypto = require('crypto');

const secretKey = process.env.SECRET_KEY

// Function to encrypt data using a secret key
export const encode = (data) => {
  const iv = crypto.randomBytes(16); // Initialization Vector for AES
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  let encryptedData = cipher.update(data);
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);

  return iv.toString('hex') + encryptedData.toString('hex');
};

// Function to decrypt data using a secret key
export const decode = (data) => {
  const iv = Buffer.from(data.substring(0, 32), 'hex');
  const encryptedData = Buffer.from(data.substring(32), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
  let decryptedData = decipher.update(encryptedData);
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);

  return decryptedData.toString('utf8');
};
