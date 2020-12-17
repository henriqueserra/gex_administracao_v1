const customExpress = require("./express.js");

module.exports = () => {
  // ===============================================
  // ===============================================
  //              Cria Servidor Web
  const app = customExpress();
  app.listen(3001, () => {
    console.log("servidor rodando na porta 3001");
  });
  // ===============================================
  // ===============================================
};
