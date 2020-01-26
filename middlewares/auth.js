"use strict";
const jwt = require("jsonwebtoken");
const User = require("../models").user;

const authorize = async (req, res, next) => {
  const token = req.headers["authorization"] || "";

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.uid);
    return next();
  } catch (err) {
    res.sendStatus(401);
  }
};

module.exports = { authorize };
