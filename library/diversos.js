const fs = require("fs");

function apagaLog() {
  const dados = new Date().toString();
  fs.writeFileSync("log.txt", dados, { overwrite: true });
}

module.exports = { apagaLog };
