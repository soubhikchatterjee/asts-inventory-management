"use strict";
const Asset = require("./index").Asset;
const ShoppingCenter = require("./index").ShoppingCenter;

module.exports = (sequelize, DataTypes) => {
  const ShoppingCenterAsset = sequelize.define("shoppingCenterAsset", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  });
  ShoppingCenterAsset.associate = function(models) {
    // associations can be defined here
  };
  return ShoppingCenterAsset;
};
