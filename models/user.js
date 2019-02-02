module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.TEXT
  });

  User.associate = function(models) {
    User.hasMany(models.StockFaves, {
      onDelete: "cascade"
    });
  };

  return User;
};
