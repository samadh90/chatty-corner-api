const crypto = require("../utilities/cryptography");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(`username: ${username}`);

  // Check if username and password is provided
  if (!username || !password || !email) {
    // If username or password is not provided, return a 400 status code and a message
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  const { passwordSalt, hashedPassword } = await crypto.saltHashPasswordBcrypt(
    password
  );

  console.log(`password: ${passwordSalt}`);

  try {
    await User.create({
      username,
      pwd_hash: hashedPassword,
      salt: passwordSalt,
      email,
    }).then((user) =>
      res.status(200).json({
        message: "User successfully created",
        user,
      })
    );
  } catch (err) {
    console.error(err); //logging the error
    res.status(401).json({
      message: "User not successful created",
      error: err.mesage,
    });
  }
};

const login = async (req, res, next) => {
  // Create a variable called 'username' that will store the username of the user
  const username = req.body.username;
  // Create a variable called 'password' that will store the password of the user
  const password = req.body.password;
  // Check if username and password is provided
  if (!username || !password) {
    // If username or password is not provided, return a 400 status code and a message
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  // Create a variable called 'user' that will store the user's username and password
  const user = {
    username: username,
    password: password,
  };
  // get user from database by username
  const userFromDB = await User.findOne({ username: username });

  // check if user exists
  if (!userFromDB) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  // check if password is correct
  const isPasswordCorrect = await crypto.checkPasswordBcrypt(
    password,
    userFromDB.salt,
    userFromDB.pwd_hash
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Password is not correct",
    });
  }

  // Create a variable called 'token' that will store the user's token
  const token = jwt.sign(user, process.env.JWT_SECRET);
  // Return a 200 status code and the user's token
  return res.status(200).json({
    message: "User successfully logged in",
    token: token,
  });
};

const resetPassword = async (req, res, next) => {
  const { username, password } = req.body;
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
};

module.exports = {
  register: register,
  login: login,
};
