"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models").User;
const { authorize } = require("../middlewares/auth");

const salt = bcrypt.genSaltSync(10);

router.post("/", [authorize], (req, res) => {
  const { full_name, email, password } = req.body;

  User.create({
    full_name,
    email,
    password: bcrypt.hashSync(password, salt),
    created_user_id: req.user.uid
  });

  res.sendStatus(201).send("OK");
});

module.exports = router;
