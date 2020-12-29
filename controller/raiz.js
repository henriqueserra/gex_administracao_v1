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
};
