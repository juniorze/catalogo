//importar Mongoose para usar o MongoDB na aplicação, requer dependencia mongoose
const mongoose = require("mongoose");

//Setar variaveis de ambientes por arquivo, requer dependencia dotenv
require("dotenv").config({ path: "variables.env" });

//Conexão ao banco de dado:
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", error => {
  console.error("ERRO: " + error.message);
});

// Carregando Models
require("../models/Post");

//Iniciando a Aplicação
const app = require("./app");

// Porta de conexão na aplicação
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log("Servidor rodando na porta: " + server.address().port);
});
