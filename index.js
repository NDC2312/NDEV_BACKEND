const express = require("express");
require("dotenv").config();
const database = require("./config/database");

const routesApiVer1 = require("./api/v1/routes/index");

database.connect();
const app = express();
const port = process.env.PORT;

// Router api/V1
routesApiVer1(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});
