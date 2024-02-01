const express = require("express");
const views = express.Router();
const Jogos = require("../database/jogos");

views.get("/lista", (req, res) => {
  res.render("index");
});

views.get("/cadastrar", (req, res) => {
  res.render("cadastrar");
});

views.get("/consultar/:id", (req, res) => {
  let id = req.params.id;

  Jogos.findByPk(id).then(jogo => {
   res.render("consultar", {jogo: jogo});

  }).catch(err =>{
    res.render("index");
  })
});

views.get("/", (req, res) => {
  res.render("login");
});

views.get("/cadastro", (req, res) => {
  res.render("cadastro-usuario")
});

module.exports = views;