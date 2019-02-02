module.exports = (sequelize, DataTypes)=> {
  var User = sequelize.define("User", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.TEXT
  });

  User.associate = (models)=>{
    User.hasMany(models.StockFaves,{
      onDelete: "cascade"
    });
  };

  return Example;
};