export const encode = (text: string) => {
  try {
    return btoa(btoa(btoa(btoa(btoa(btoa(btoa(text?.trim()?.toString())))))));
  } catch (error) {
    return text;
  }
};

export const decode = (text: string) => {
  try {
    return atob(atob(atob(atob(atob(atob(atob(text?.trim()?.toString())))))));
  } catch (error) {
    return text;
  }
};

// Function to XOR the data with the secret key
function xorEncryptDecrypt(data, key) {
    let output = [];
    for (let i = 0; i < data.length; i++) {
        output.push(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return String.fromCharCode.apply(String, output);
}

// Function to encode to Base64
function base64Encode(data) {
    return btoa(data);
}

// Function to decode from Base64
function base64Decode(data) {
    return atob(data);
}

// Function to encrypt data using a secret key
function encrypt(data, secretKey) {
    const xorData = xorEncryptDecrypt(data, secretKey);
    return base64Encode(xorData);
}

// Function to decrypt data using a secret key
function decrypt(data, secretKey) {
    const base64Decoded = base64Decode(data);
    return xorEncryptDecrypt(base64Decoded, secretKey);
}

// Usage example
const secretKey = "mySecretKey123";  // Your secret key
const originalData = "Hello, World!";

// Encrypt the data
const encryptedData = encrypt(originalData, secretKey);
console.log("Encrypted Data:", encryptedData);

// Decrypt the data
const decryptedData = decrypt(encryptedData, secretKey);
console.log("Decrypted Data:", decryptedData);
