const webServer = require("./webserver");
const customExpress = require("./express.js");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  webServer();
  const app = customExpress();

  app.listen(4000, () => {
    console.clear();
    console.log("servidor rodando na porta 4000");
  });

  console.log(`Worker ${process.pid} started`);
}
