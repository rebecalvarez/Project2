require("dotenv").config();
var express = require("express");
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var Strategy = require('passport-facebook').Strategy;

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;


var FACEBOOK_ID = '226975514781110';
var FACEBOOK_SECRET = '6c5be79b91ec1d32af60d9abf23c3083'

var fbOptions = {
  clientID: FACEBOOK_ID,
  clientSecret: FACEBOOK_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileField: ['email']
}

var fbCallback = function (accessToken, refreshToken, profile, cb) {

  console.log(profile);
  return cb(null, profile);
};

passport.use(new Strategy(fbOptions, fbCallback));

app.route('/signupwithfacebook')
  .get(passport.authenticate('facebook'));

//app.route('/').get(passport.authenticate('facebook',{scope:['email']}));

app.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', function(err,user,info){
    console.log(err,user,info);
    if (err){
      resizeBy.send('success');
    }
  }
  ))

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});













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
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
