const jwt = require("jsonwebtoken");

// This function validates the jwt token.
// The function is called by the express middleware
// function, which is passed in the request and response
// objects.
// If the token is valid, the function calls next()
// to pass control to the next middleware function.
// If the token is invalid, the function returns an error.
const validateJwtToken = (req, res, next) => {
  try {
    // Check for presence of authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Authorization header is missing",
      });
    }

    // Check that the authorization header is in the correct format
    if (req.headers.authorization.split(" ")[0] !== "Bearer") {
      return res.status(401).json({
        message: "Authorization header is not in the correct format",
      });
    }

    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Check for presence of token
    if (!token) {
      return res.status(401).json({
        message: "Token is missing",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      next();
    });
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

// function to decode the jwt token
const decodeJwtToken = (req, res, next) => {
  // get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  // if no token found, return response (without going to the next middelware)
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  try {
    // if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    // if invalid token
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = {
  validateJwtToken,
  decodeJwtToken,
};
