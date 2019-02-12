require("dotenv").config();
var express = require("express");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var Strategy = require("passport-facebook").Strategy;
var bcrypt = require("bcryptjs");
var b = require("bcrypt-nodejs");
var db = require("./models");
var cookieSession = require("cookie-session");

var app = express();
var PORT = process.env.PORT || 3000;

//     a();

// };

// passport.use(new Strategy(fbOptions, fbCallback));

// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

//   app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
// app.route('/signupwithfacebook')
//   .get(passport.authenticate('facebook', { scope: ['email'] }));

// app.get('/callback', function(req, res,err,user,info) {
//   console.log(err,user,info);
//   res.redirect('/');
//  });

//app.route('/').get(passport.authenticate('facebook',{scope:['email']}));

// {app.route('/callback')
//   .get(passport.authenticate('facebook', function (res, err, user, info) {
//     console.log(err, user, info)

//   }
//   )).get('/', function(req,res){
//     res.redirect('/');
//   });
// }

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: ["user"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

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
