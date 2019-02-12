require("dotenv").config();
var express = require("express");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var Strategy = require("passport-facebook").Strategy;
var bcrypt=require("bcryptjs");
var b=require("bcrypt-nodejs")
var db = require("./models");
var LocalStrategy = require('passport-local');

var app = express();
var PORT = process.env.PORT || 3000;



passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, cb) {
    models.Example.findOne({
        where: {
            email: email
        }
    }).then(
        function(Example) {
          if (!Example || !Example.validatePassword(password)) {
            
              return cb(null, false, {message: 'Incorrect email or password.'});
          }
            return cb(null, Example, {message: 'Logged In Successfully'});
        }
      ).catch(function(error) {
        cb(error)
        throw error;
      });
    }
  ));
















// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
