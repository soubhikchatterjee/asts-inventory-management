'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShoppingCenter = sequelize.define('ShoppingCenter', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    created_user_id: DataTypes.INTEGER
  }, {});
  ShoppingCenter.associate = function(models) {
    // associations can be defined here
  };
  return ShoppingCenter;
};