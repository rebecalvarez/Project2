module.exports = function(sequelize, DataTypes) {
  var StockFaves = sequelize.define("StockFaves", {
    url: DataTypes.STRING
  });

  return StockFaves;
};
