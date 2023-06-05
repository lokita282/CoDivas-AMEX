// Importing the modules
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: __dirname+'/.env'});

const connectionParameters = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// Connecting to the database
const connection = mongoose
  .connect(process.env.URI, connectionParameters)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

// exporting the module
module.exports = connection;
