const secretKey: string = process.env.SECRET_KEY || '';

// Function to XOR the data with the secret key
function xorEncryptDecrypt(data: string, key: string) {
  let output = [];
  for (let i = 0; i < data.length; i++) {
    output.push(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return String.fromCharCode.apply(String, output);
}

// Function to encode to Base64
function base64Encode(data: string) {
  return btoa(data);
}

// Function to decode from Base64
function base64Decode(data: string) {
  return atob(data);
}

// Function to encrypt data using a secret key
export const encode = (data: string) => {
  const xorData = xorEncryptDecrypt(data, secretKey);
  return base64Encode(xorData);
};

// Function to decrypt data using a secret key
export const decode = (data: string) => {
  const base64Decoded = base64Decode(data);
  return xorEncryptDecrypt(base64Decoded, secretKey);
};
