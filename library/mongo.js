const MongoClient = require("mongodb").MongoClient;
require("dotenv/config");

async function conexaoMongo(stringConnexao) {
  if (stringConnexao) {
    return new Promise((resolve, reject) => {
      const opcoesDeConexao = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      MongoClient.connect(stringConnexao, opcoesDeConexao, (erro, conexao) => {
        if (erro) {
          console.log("Conexão com Mongo mal sucedida..." + new Date());
          reject(erro);
        } else {
          console.log("Conexão com Mongo bem sucedida..." + new Date());
          resolve(conexao);
        }
      });
    });
  }
}

async function criaBancoECollections(idEstabelecimentoBubble) {
  const stringConexao =
    process.env.CONNECTIONSTRING1 +
    idEstabelecimentoBubble.toString() +
    process.env.CONNECTIONSTRING2;
  const client = await conexaoMongo(stringConexao);
  var resposta = await client
    .db(idEstabelecimentoBubble.toString())
    .createCollection("VENDAS");
  resposta = await client
    .db(idEstabelecimentoBubble.toString())
    .createCollection("VENDAVEL");
  resposta = await client
    .db(idEstabelecimentoBubble.toString())
    .createCollection("INSUMO");
  resposta = await client
    .db(idEstabelecimentoBubble.toString())
    .createCollection("MEIODEPAGAMENTO");
  resposta = await client
    .db(idEstabelecimentoBubble.toString())
    .createCollection("PAGAMENTO");
  resposta = await client
    .db(idEstabelecimentoBubble.toString())
    .createCollection("FOLHADEPONTO");
  fechamento = await client.close();
  return "ok";
}

module.exports = {
  conexaoMongo,
  criaBancoECollections,
};
