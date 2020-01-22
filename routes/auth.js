"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models").User;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await User.findOne({
    where: {
      email
    }
  });

  if (bcrypt.compareSync(password, result.password)) {
    const token = jwt.sign({ uid: result.id, email }, process.env.JWT_SECRET);
    res.json({
      token
    });
  }

  res.sendStatus(400);
});

router.post("/verify", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.send(decoded);
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
