const fs = require("fs");

function apagaLog() {
  try {
    const dados = new Date().toString();
    fs.writeFileSync("log.txt", dados, { overwrite: true });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { apagaLog };
