var db = require("../models");
// var User = require("../models/user");

module.exports = function(app) {
  // INDEX PAGE
  app.get("/", function(req, res) {
    res.render("index");
  });

  // USER PAGE
  app.get("/user", function(req, res) {
    // SELECT ALL RECORDS FROM STOCKFAVES TABLE TO USE FOR HANDLEBARS OBJECT
    db.StockFaves.findAll({}).then(function(data) {
      res.render("user", {
        images: data
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
