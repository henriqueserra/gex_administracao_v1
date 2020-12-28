const express = require("express");
const cors = require("cors");
const consign = require("consign");
const bodyParser = require("body-parser");

const app = express();
app.use(require("express-status-monitor")());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

consign().include("./controller").into(app);

app.listen(4000, () => {
  console.log("servidor rodando na porta 4000");
});
