"use strict";

module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "asset",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: DataTypes.STRING,
      dimensions: DataTypes.STRING,
      location: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Asset.associate = function(models) {
    Asset.belongsTo(models.user);
    Asset.belongsToMany(models.shoppingCenter, {
      through: models.shoppingCenterAsset
    });
  };
  return Asset;
};
