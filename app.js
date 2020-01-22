"use strict";

require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Require the route
require("./routes")(app);

app.listen(process.env.PORT);
