const crypto = require('crypto');

const secretKey: string = process.env.SECRET_KEY || '';

if (!secretKey) {
  throw new Error('Secret key is not defined in the environment variables.');
}

// Function to encrypt data using a secret key
export const encode = (data: string): string => {
  const iv = crypto.randomBytes(16); // Initialization Vector for AES
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
  let encryptedData = cipher.update(data);
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);

  return iv.toString('hex') + encryptedData.toString('hex');
};

// Function to decrypt data using a secret key
export const decode = (data: string): string => {
  const iv = Buffer.from(data.substring(0, 32), 'hex');
  const encryptedData = Buffer.from(data.substring(32), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
  let decryptedData = decipher.update(encryptedData);
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);

  return decryptedData.toString('utf8');
};

