"use strict";

const express = require("express");
const router = express.Router();
const ShoppingCenter = require("../models").ShoppingCenter;
const User = require("../models").User;
const { authorize } = require("../middlewares/auth");

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
      }
    ]
  });

  res.json(data);
});

/**
 * Create a new Shopping Center data
 */
router.post("/", [authorize], (req, res) => {
  const { name, address } = req.body;

  ShoppingCenter.create({
    name,
    address,
    updated_user_id: req.user.uid
  });

  res.sendStatus(201).send("OK");
});

/**
 * Update an existing new Shopping Center data
 */
router.put("/:id", [authorize], (req, res) => {
  const { name, address } = req.body;

  ShoppingCenter.update(
    {
      name,
      address,
      updated_user_id: req.user.uid
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
