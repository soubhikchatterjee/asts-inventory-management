"use strict";

const express = require("express");
const router = express.Router();
const ShoppingCenter = require("../models").shoppingCenter;
const User = require("../models").user;
const { authorize } = require("../middlewares/auth");
const {
  shoppingCenterValidationMiddleware
} = require("../middlewares/shopping-centers");
const Asset = require("../models").asset;

/**
 * Get All Shopping Center data
 */
router.get("/", [authorize], async (req, res) => {
  const offset = Math.abs(+req.query.page - 1) || 0;
  const data = await ShoppingCenter.findAll({
    offset,
    limit: +process.env.DB_LIMIT,
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] }
      },
      {
        model: Asset
      }
    ]
  });
  res.json(data);
});

/**
 * Get a single Shopping Center data
 */
router.get("/:id", [authorize], async (req, res) => {
  const data = await ShoppingCenter.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] }
      },
      {
        model: Asset
      }
    ]
  });

  res.json(data);
});

/**
 * Create a new Shopping Center data
 */
router.post(
  "/",
  [authorize, shoppingCenterValidationMiddleware],
  async (req, res) => {
    const { name, address, assets } = req.body;

    const shoppingCenterObject = await req.user.createShoppingCenter({
      name,
      address
    });

    await shoppingCenterObject.addAssets(assets);

    res.send(201).send("OK");
  }
);

/**
 * Update an existing Shopping Center data
 */
router.put(
  "/:id",
  [authorize, shoppingCenterValidationMiddleware],
  async (req, res) => {
    const { name, address, assets } = req.body;

    const shoppingCenterObject = await ShoppingCenter.findByPk(req.params.id);

    shoppingCenterObject.update({
      name,
      address,
      userId: req.user.id
    });

    await shoppingCenterObject.setAssets(assets);

    res.status(200).send(shoppingCenterObject);
  }
);

module.exports = router;
