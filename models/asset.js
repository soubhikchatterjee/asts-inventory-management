"use strict";

module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "Asset",
    {
      name: DataTypes.STRING,
      dimensions: DataTypes.STRING,
      location: DataTypes.STRING,
      status: DataTypes.STRING,
      shopping_center_id: DataTypes.INTEGER,
      updated_user_id: DataTypes.INTEGER
    },
    {}
  );
  Asset.associate = function(models) {
    // associations can be defined here
    Asset.belongsTo(models.User, {
      foreignKey: "updated_user_id"
    });
  };
  return Asset;
};
