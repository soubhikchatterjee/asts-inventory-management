"use strict";

module.exports = (req, res, next) => {
  process.on("uncaughtException", error => {
    console.log(`Error: ${error.message}`);
    return res.status(500).send("Internal server error");
  });

  process.on("unhandledRejection", error => {
    console.log(`${error.message}`);
    return res.status(500).send("Internal server error");
  });

  next();
};
