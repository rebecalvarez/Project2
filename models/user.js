

module.exports = function(sequelize, DataTypes) 
{
  var Example = sequelize.define("Example", {
    email: DataTypes.STRING,
    password : DataTypes.STRING,
    username: DataTypes.STRING
  });

  Example.associate = function(models) {
    Example.hasMany(models.StockFaves, {
      onDelete: "cascade"
    });
  };
 
  return Example;
};
  