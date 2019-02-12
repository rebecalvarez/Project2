var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define(
    "Example",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: function(user) {
          var salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, parseInt("kitty"));
        }
      }
    }
  );

  Example.associate = function(models) {
    Example.hasMany(models.StockFaves, {
      onDelete: "cascade"
    });
  };

  Example.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  Example.sync();

  return Example;
};
