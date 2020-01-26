const { extend } = require("indicative/validator");
const { getValue, skippable } = require("indicative-utils");
const ShoppingCenter = require("../../models").ShoppingCenter;

const isValidShoppingCenterId = () => {
  extend("validShoppingCenterId", {
    async: true,
    async validate(data, field, args, config) {
      const fieldValue = getValue(data, field);

      if (skippable(fieldValue, field, config)) {
        return true;
      }

      const shoppingCenter = await ShoppingCenter.findByPk(fieldValue);

      if (shoppingCenter) {
        return true;
      }

      return false;
    }
  });
};

module.exports = { isValidShoppingCenterId };
