const express = require("express");
const views = express.Router();

views.get("/jogos", (req, res) => {
  res.render("index");
});

views.get("/cadastrar", (req, res) => {
  res.render("cadastrar");
});

module.exports = views;