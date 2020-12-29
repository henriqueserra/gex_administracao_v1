const fs = require("fs");
const { pathToFileURL } = require("url");
const path = require("path");
const diversos = require("../library/diversos.js");

module.exports = (app) => {
  app.get("/", async (requisicao, resposta) => {
    resposta.status(200).send("Consultado RAIZ " + new Date());
  });
  app.get("/time", async (requisicao, resposta) => {
    resposta.status(200).send("Time Now" + new Date());
  });
  app.get("/network", async (requisicao, resposta) => {
    const { networkInterfaces } = require("os");
    const nets = networkInterfaces();
    resposta.status(200).send(nets);
  });
  app.get("/log", async (requisicao, resposta) => {
    resposta.set("Content-Type", "text/plain");
    fs.stat("log.txt", (error, stats) => {
      if (error) {
        if (error.errno === -4058) {
          diversos.apagaLog();
          resposta.sendFile("log.txt", {
            root: path.dirname(__dirname),
          });
        }
        console.log("Criado arquivo de log");
      } else {
        resposta.sendFile("log.txt", { root: path.dirname(__dirname) });
      }
    });
  });
  app.get("/apagalog", async (requisicao, resposta) => {
    diversos.apagaLog();
    resposta.send(fs.readFileSync("log.txt", { encoding: "utf-8", flag: "r" }));
  });
};
