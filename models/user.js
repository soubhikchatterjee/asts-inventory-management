"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  User.associate = function(models) {
    User.hasOne(models.asset);
    User.hasOne(models.shoppingCenter);
  };
  return User;
};
