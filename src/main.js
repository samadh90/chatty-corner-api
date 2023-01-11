const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("../swagger.js");
const nodemailer = require("./tools/nodemailer");
const dbConnection = require("./configs/db.config");
const routes = require("./routes");

require("dotenv").config();

const app = express();

// Connect to MongoDB
dbConnection();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(morgan("combined"));

//routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

app.use("/auth", routes.authRoute);

app.get("/create-validation-link", (req, res) => {
  let domain = req.headers.host;
  let { validationLink, token } = nodemailer.createValidationLink(domain);
  res.send(validationLink);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
