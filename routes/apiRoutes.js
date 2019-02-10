var db = require("../models");
module.exports = function(app) {
  // Get all examples
  app.get("/api/user", function(req, res) {
    db.Example.findAll({}).then(function(user) {
      res.json(user);
      // console.log(res.json(dbExamples));
    });
  });

  // app.get("/api/user/:email", function(req, res) {
  //   db.Example.findAll({where :{email:req.params.email}}).then(function(user) {
  //     res.json(user);
  // console.log(res.json(dbExamples));
  // CREATE A NEW ACCOUNT
  app.post("/api/user", function(req, res) {
    db.Users.create(req.body).then(function(user) {
      res.json(user);
    });
  });

  // SAVE STOCKFAVE
  app.post("/api/stockfaves", function(request, response) {
    db.StockFaves.create(request.body).then(function(record) {
      response.json(record);
    });
  });
};
