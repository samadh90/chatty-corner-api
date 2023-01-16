const crypto = require("../utils/cryptography");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const schemas = require("../models/schemas");

// used for logging in and obtaining a token
const login = async (req, res, next) => {
  const formData = req.body;
  const { error } = schemas.loginSchema.validate(formData);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

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

// used for logging out and invalidating a token
const logout = async (req, res, next) => {};

// used for refreshing a token
const refresh = async (req, res, next) => {};

// used for creating a new user account
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

// used for requesting a password reset
const password_forgot = async (req, res, next) => {};

// used for resetting a password
const password_reset = async (req, res, next) => {};

// used to retrieve information about the currently authenticated user
const me = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-pwd_hash -salt");
  res.status(200).json({
    message: "User successfully retrieved",
    user,
  });
};

// used to authorize a user to perform certain actions or access certain resources
const authorize = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Token is not valid",
    });
  }
};

// used to authorize a user to perform certain actions or access certain resources
const roles = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-pwd_hash -salt");
  if (user.role === "admin") {
    next();
  } else {
    res.status(401).json({
      message: "User is not authorized",
    });
  }
};

// used to retrieve information about the permissions associated with a user or resource
const permissions = async (req, res, next) => {};

// used for managing a list of invalidated tokens
const blacklist = async (req, res, next) => {};

//  used for validating a token and checking if it is still active
const validate = async (req, res, next) => {};

module.exports = {
  login,
  logout,
  refresh,
  register,
  password_forgot,
  password_reset,
  me,
  authorize,
  roles,
  permissions,
  blacklist,
  validate,
};
