var Example = require("./user.js");
module.exports = function(sequelize, DataTypes) {
  var StockFaves = sequelize.define("StockFaves", {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    category: DataTypes.TEXT
  });

  Example.associate = function(models) {
    Example.hasMany(models.StockFaves, {
      onDelete: "cascade"
    });
  };

  return StockFaves;
};
