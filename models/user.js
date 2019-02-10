module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING
  });

  Users.associate = function(models) {
    Users.hasMany(models.StockFaves, {
      onDelete: "cascade"
    });
  };

  return Users;
};
