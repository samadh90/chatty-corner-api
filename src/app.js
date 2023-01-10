const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const jwt = require("jsonwebtoken");
const swaggerJSDoc = require("./swagger");

require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

//routes
const authRoutes = require("./routes/auth.route")

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));
app.use("/auth", authRoutes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
