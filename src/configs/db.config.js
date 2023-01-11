const mongoose = require("mongoose");

const dbConnection = () => {
  // Connect to MongoDB
  mongoose.set("strictQuery", false);
  // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  const dbURL = process.env.MONGO_URI;
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("Successfully connected to MongoDB Atlas");
  });
  connection.on("error", (err) => {
    console.log("MongoDB Atlas connection error: " + err);
  });
};

module.exports = dbConnection;