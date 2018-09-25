const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
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

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());

app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
