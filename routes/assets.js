"use strict";

const express = require("express");
const router = express.Router();
const Asset = require("../models").asset;
const ShoppingCenter = require("../models").shoppingCenter;
const { authorize } = require("../middlewares/auth");
const { assetValidationMiddleware } = require("../middlewares/assets");

/**
 * Get All assets data
 */
router.get("/", [authorize], async (req, res) => {
  const offset = Math.abs(+req.query.page - 1) || 0;
  const data = await Asset.findAll({
    offset,
    limit: +process.env.DB_LIMIT,
    include: [
      {
        model: ShoppingCenter
      }
    ]
  });
  res.json(data);
});

/**
 * Get a single asset data
 */
router.get("/:id", [authorize], async (req, res) => {
  const data = await Asset.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: ShoppingCenter
      }
    ]
  });

  res.json(data);
});

/**
 * Create a new asset
 */
router.post("/", [authorize, assetValidationMiddleware], async (req, res) => {
  const { name, dimensions, location, status, shopping_center_id } = req.body;

  await req.user.createAsset({
    name,
    dimensions,
    location,
    status
  });

  res.status(201).send("OK");
});

/**
 * Update an existing asset
 */
router.put("/:id", [authorize, assetValidationMiddleware], async (req, res) => {
  const { name, dimensions, location, status } = req.body;

  await Asset.update(
    {
      name,
      dimensions,
      location,
      status,
      userId: req.user.id
    },
    {
      where: {
        id: req.params.id
      }
    }
  );

  res.sendStatus(200).send("OK");
});

module.exports = router;
