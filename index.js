const express = require("express");
const bodyParser = require("body-parser");
const conn = require("./database/conn");
const RouterJogos = require("./routers/jogosController");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// IMPORTANDO ROTAS
app.use("/", RouterJogos);

app.listen(4567, () => {
  console.log("API Liberada!");
});

// DATABASE
conn.authenticate()
  .then(()=>{
    console.log("Conexão realizada com sucesso!");
  }).catch((error)=>{
    console.log(error);
});
