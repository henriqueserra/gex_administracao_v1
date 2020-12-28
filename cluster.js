const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const express = require("express");
const cors = require("cors");
const consign = require("consign");
const bodyParser = require("body-parser");
const morgan = require("morgan");

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const app = express();
  app.use(morgan("combined"));
  app.use(require("express-status-monitor")());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  consign().include("./controller").into(app);

  app.listen(3500, () => {
    // console.clear();
    console.log("servidor rodando na porta 3500");
  });

  console.log(`Worker ${process.pid} started`);
}
