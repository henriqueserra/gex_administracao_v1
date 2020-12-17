const mongo = require("../library/mongo.js");

module.exports = (app) => {
  app.get("/onboarding/criadb", async (requisicao, resposta) => {
    const resultado = await mongo.criaBancoECollections(requisicao.query.id);
    resposta.status(200).send(resultado);
  });
};
