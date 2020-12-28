module.exports = (app) => {
  app.get("/", async (requisicao, resposta) => {
    resposta.status(200).send("Consultado RAIZ " + new Date());
  });
  app.get("/time", async (requisicao, resposta) => {
    resposta.status(200).send("Time Now" + new Date());
  });
};
