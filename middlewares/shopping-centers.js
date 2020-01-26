"use strict";
const { validateAll } = require("indicative/validator");

const shoppingCenterValidationMiddleware = async (req, res, next) => {
  // isValidShoppingCenterId();

  const rules = {
    name: "required",
    address: "required|min:4"
  };

  const messages = {
    required: "Make sure to enter the field value",
    min: "The value is too small"
  };

  try {
    await validateAll(req.body, rules, messages);
    next();
  } catch (errors) {
    res.json(errors, 400);
  }
};

module.exports = { shoppingCenterValidationMiddleware };
