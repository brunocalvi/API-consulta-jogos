const express = require("express");
const bodyParser = require("body-parser");
const conn = require("./database/conn");
const RouterJogos = require("./routers/jogosController");
const RouterViews = require("./routers/viewsController")
const cors = require("cors");

const app = express();
app.use(cors());
app.set("view engine", "ejs");

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// IMPORTANDO ROTAS
app.use("/", RouterJogos);
app.use("/views/", RouterViews);

app.listen(4567, () => {
  console.log("API na porta 4567 Liberada!");
});

// DATABASE
conn.authenticate()
  .then(()=>{
    console.log("Conexão realizada com sucesso!");
  }).catch((error)=>{
    console.log(error);
});
