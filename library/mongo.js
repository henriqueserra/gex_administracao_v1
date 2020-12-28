const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
require("dotenv/config");

async function conexaoMongo(idEstabelecimentoBubble) {
  if (idEstabelecimentoBubble) {
    return new Promise((resolve, reject) => {
      const opcoesDeConexao = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      const stringConnexao =
        process.env.CONNECTIONSTRING1 +
        idEstabelecimentoBubble.toString() +
        process.env.CONNECTIONSTRING2;
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

async function listaDeCollections(client) {
  const resultado = await client
    .db("gex-admin")
    .collection("COLLECTIONS")
    .find({})
    .toArray();
  return resultado;
}

async function criaCollection(conexao, collection) {
  return new Promise(async (resolve, reject) => {
    conexao.createCollection(collection, (erro) => {
      if (erro) {
        assert.deepStrictEqual(48, erro.code);
        if (erro.code === 48) {
          resolve({
            Collection: collection,
            Status: "Ja existente",
          });
        } else {
          reject(erro);
        }
        reject(erro);
      } else {
        resolve({
          Collection: collection,
          Status: "Criado",
        });
      }
    });
  });
}

async function criaBancoECollections(idEstabelecimentoBubble) {
  const client = await conexaoMongo(idEstabelecimentoBubble);
  const collections = await listaDeCollections(client);
  let indice = 0;
  do {
    var resultado = await criaCollection(
      client.db(idEstabelecimentoBubble),
      collections[indice].collection
    );
    console.log(resultado);
    indice++;
  } while (indice < Object.keys(collections).length);

  await client.close();
  return collections;
}

module.exports = {
  conexaoMongo,
  criaBancoECollections,
};
