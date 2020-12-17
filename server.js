const webServer = require("./webserver");
const customExpress = require("./express.js");

webServer();
const app = customExpress();

app.listen(4000, () => {
  console.clear();
  console.log("servidor rodando na porta 4000");
});
