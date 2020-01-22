"use strict";

const express = require("express");
const router = express.Router();
const Asset = require("../models").Asset;
const { authorize } = require("../middlewares/auth");

router.post("/", [authorize], (req, res) => {
  const { name, dimensions, location, status, shopping_center_id } = req.body;

  Asset.create({
    name,
    dimensions,
    location,
    status,
    shopping_center_id,
    updated_user_id: req.user.uid
  });

  res.sendStatus(201).send("OK");
});

router.put("/:id", [authorize], (req, res) => {
  const { name, dimensions, location, status, shopping_center_id } = req.body;

  Asset.update(
    {
      name,
      dimensions,
      location,
      status,
      shopping_center_id,
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
