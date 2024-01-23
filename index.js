const express = require("express");
const bodyParser = require("body-parser");
const conn = require("./database/conn");
const RouterJogos = require("./routers/jogosController");
const RouterViews = require("./routers/viewsController")
const cors = require("cors");

const app = express();
app.use(cors());
app.set("view engine", "ejs");

// IMPORTANDO ROTAS
app.use("/", RouterJogos);
app.use("/views/", RouterViews);

// BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
