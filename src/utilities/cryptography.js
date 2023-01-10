const bcrypt = require("bcryptjs");

const saltHashPasswordBcrypt = async (userpassword, saltRounds = 12) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(userpassword, salt);
  return { passwordSalt: salt, hashedPassword: hashedPassword };
};

const generateHash = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

const sha256 = (password, salt) => {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  const value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value,
  };
};

const sha512 = (password, salt) => {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  const value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value,
  };
};

// Generate a randon Salt and Hash the password then returns the salt and hash
const saltHashPassword = (userpassword, size = 512) => {
  const salt = generateHash(16);

  // based on the size of the hash, we will use the appropriate algorithm
  if (size === 256) {
    const passwordData = sha256(userpassword, salt);
    return passwordData;
  }

  if (size === 512) {
    const passwordData = sha512(userpassword, salt);
    return passwordData;
  }
};

const checkHashPassword = (userpassword, salt) => {
  const passwordData = sha512(userpassword, salt);
  return passwordData;
};

// RSA Encrypt and return the encrypted value
const encryptRSA = (input) => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
      cipher: "aes-256-cbc",
    },
  });
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(input)
  );
  return encrypted.toString("base64");
};

// RSA Decrypt and return the decrypted value
const decryptRSA = (input) => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
      cipher: "aes-256-cbc",
    },
  });
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(input, "base64")
  );
  return decrypted.toString();
};

// export the functions
module.exports = {
  saltHashPassword,
  checkHashPassword,
  encryptRSA,
  decryptRSA,
  saltHashPasswordBcrypt,
};
