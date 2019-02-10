var db = require("../models");

module.exports = function(app) {
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
