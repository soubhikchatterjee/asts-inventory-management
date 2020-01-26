"use strict";

module.exports = (sequelize, DataTypes) => {
  const ShoppingCenter = sequelize.define(
    "shoppingCenter",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {}
  );
  ShoppingCenter.associate = function(models) {
    // associations can be defined here
    ShoppingCenter.belongsTo(models.user);
    ShoppingCenter.belongsToMany(models.asset, {
      through: models.shoppingCenterAsset
    });
  };
  return ShoppingCenter;
};
