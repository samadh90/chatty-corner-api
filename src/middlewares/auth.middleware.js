const jwt = require("jsonwebtoken");

const validateJwtToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for presence of authorization header
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header is missing",
      });
    }

    // Check that the authorization header is in the correct format
    if (authHeader.split(" ")[0] !== "Bearer") {
      return res.status(401).json({
        message: "Authorization header is not in the correct format",
      });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

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
