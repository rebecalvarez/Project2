module.exports = (sequelize, DataTypes) => {
    var StockFaves = sequelize.define("StockFaves", {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        category: DataTypes.TEXT
    });

    User.associate = (models) => {
        User.hasMany(models.StockFaves, {
            onDelete: "cascade"
        });
    };

    return Example;
};