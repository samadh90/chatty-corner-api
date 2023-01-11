const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("../swagger.js");
const nodemailer = require("./tools/nodemailer");

require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const dbURL = process.env.MONGO_URI;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log("Successfully connected to MongoDB Atlas");
});
connection.on('error', (err) => {
    console.log("MongoDB Atlas connection error: " + err);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

//routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

const authRoute = require("./routes/auth.route");
app.use("/auth", authRoute);

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
