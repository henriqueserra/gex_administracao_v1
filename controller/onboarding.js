const mongo = require("../library/mongo.js");

module.exports = (app) => {
  app.get("/onboarding/criadb", async (requisicao, resposta) => {
    if (requisicao.query.nomedb) {
      const resultado = await mongo.criaBancoECollections(
        requisicao.query.nomedb
      );
      resposta.status(200).send(resultado);
    } else {
      resposta.status(401).json({ erro: "Requisição mal formada" });
    }
  });
};
