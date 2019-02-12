var db = require("../models");
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync();

module.exports = function(app) {
  // Get all examples

  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
      // console.log(res.json(dbExamples));
    });
  });

  app.get("/api/examples1/:email/:password", function(req, res) {
    db.Example.findOne({
      where: {
        //password: (bcrypt.hashSync(req.params.password, parseInt("kitty"))),
        email: req.params.email
      }
    }).then(function(dbExamples) {
      //console.log(dbE)

      bcrypt.compare(
        req.params.password,
        dbExamples.dataValues.password,
        function(err, result) {
          if (result == true) {
            console.log("hello");
          } else {
            console.log("wrong");
          }
        }
      );
      //console.log(dbExamples.dataValues.email);

      res.json(dbExamples);
    });
  });

  app.get("/api/examples/:email", function(req, res) {
    db.Example.findAll({ where: { email: req.params.email } }).then(function(
      dbExamples
    ) {
      //console.log(dbExamples);
      setTimeout(function() {
        //console.log(dbExamples);
      }, 1000);
      res.json(dbExamples);
    });
  });

  app.get("/api/examples/check/:password", function(req, res) {
    db.Example.findOne({
      where: {
        email: req.params.email,
        password: bcrypt.hashSync(req.params.password, parseInt("cowabunga"))
      }
    }).then(function(dbExamples) {
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

  // DELETE route for deleting posts
  app.delete("/api/stockfaves/:id", function(req, res) {
    db.StockFaves.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.post("/api/download", function(req, res) {
    db.StockFaves.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
