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

module.exports = validateJwtToken;
