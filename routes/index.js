"use strict";

const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const errorMiddleware = require("../middlewares/errorMiddleware");

module.exports = app => {
  app.use(express.json());
  app.use(compression());
  app.use(morgan("tiny"));
  app.use(cors());

  app.use(errorMiddleware);

  // Routes
  const BASE_URL = "/api/v1";
  app.use(`${BASE_URL}/auth`, require("./auth"));
  app.use(`${BASE_URL}/users`, require("./users"));
  app.use(`${BASE_URL}/shopping-centers`, require("./shopping-centers"));
  app.use(`${BASE_URL}/assets`, require("./assets"));
  app.use("*", require("./404"));

  // Error Middleware
};
