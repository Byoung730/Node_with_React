const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/user");

require("./services/passport");

const options = {
  useNewUrlParser: true,
  reconnectTries: 100,
  reconnectInterval: 500,
  poolSize: 10 // Maintain up to 10 socket connections
};

mongoose
  .connect(
    keys.mongoURI,
    options
  )
  .then(
    () => {
      console.log("connected to mongoDB");
    },
    err => {
      console.log("err", err);
    }
  );

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
