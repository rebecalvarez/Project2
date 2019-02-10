var db = require("../models");
module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
      // console.log(res.json(dbExamples));
    });
  });

  app.get("/api/examples/:email", function(req, res) {
    db.Example.findAll({ where: { email: req.params.email } }).then(function(
      dbExamples
    ) {
      res.json(dbExamples);
    });
  });
  // console.log(res.json(dbExamples));
  // CREATE A NEW ACCOUNT
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(user) {
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
