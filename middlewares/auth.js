"use strict";
const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const token = req.headers["authorization"] || "";

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    res.sendStatus(401);
  }
};

module.exports = { authorize };
