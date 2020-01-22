"use strict";
module.exports = (sequelize, DataTypes) => {
  const ShoppingCenter = sequelize.define(
    "ShoppingCenter",
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      updated_user_id: DataTypes.INTEGER
    },
    {}
  );
  ShoppingCenter.associate = function(models) {
    // associations can be defined here
    ShoppingCenter.belongsTo(models.User, {
      foreignKey: "updated_user_id"
    });
  };
  return ShoppingCenter;
};
