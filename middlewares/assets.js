"use strict";
const { validateAll } = require("indicative/validator");
const { isValidShoppingCenterId } = require("./rules/assets");

const assetValidationMiddleware = async (req, res, next) => {
  isValidShoppingCenterId();

  const rules = {
    name: "required",
    dimensions: "required|min:4",
    location: "required|min:4",
    status: "required|in:ACTIVE,BOOKED,INACTIVE"
  };

  const messages = {
    required: "Make sure to enter the field value",
    validShoppingCenterId: "Shopping center id is not valid",
    min: "The value is too small"
  };

  try {
    await validateAll(req.body, rules, messages);
    next();
  } catch (errors) {
    res.json(errors, 400);
  }
};

module.exports = { assetValidationMiddleware };
