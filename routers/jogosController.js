const express = require("express");
const router = express.Router();
const Jogos = require("../database/table");

router.get("/games",(req, res) => {
  Jogos.findAll({raw: true, order:[['id','DESC']]})
  .then( jogos => {
    res.status(200).json({status : 200, Mensagem : `Lista de jogos`, jogos});
  });
});

router.post("/game", (req, res) => {
  var {title, price, year} = req.body;

  //console.log("teste: " + req.body);

  //let title = req.body.title;
  //let price = req.body.price;
  //let year = req.body.year;

  if(title == undefined && price == undefined && year == undefined) {
    res.status(400).send({status : 400, Mensagem : `Campos vazios.`});

  } else {
    if(isNaN(price) && isNaN(year)) {
      res.status(400).send({status : 400, Mensagem : `Parametro indevidos.`});

    } else {
      Jogos.create({title: title, price: price, year: year}).then(() => {
        res.status(200).send({status : 200, Mensagem : `Jogo cadastrado com sucesso.`});
      });
    } 
  }
});

router.get("/game/:id", (req, res) => {
  var reqId = req.params.id;

  if(isNaN(reqId)) {
    res.status(400).send({status : 400, Mensagem : `Parametro indevido.`});

  } else {
    var id = parseInt(reqId);

    Jogos.findOne({where: {id: id}}).then( jogo => {
      if(jogo == undefined) {
        res.status(404).send({status : 404, Mensagem : `Nenhum registro encontrado.`});

      } else {
        res.status(200).json({status : 200, Mensagem : `jogo`, jogo});
      }
    });
  } 
});

router.delete("/game/:id", (req, res) => {
  var reqId = req.params.id;

  if(isNaN(reqId)) {
    res.status(400).send({status : 400, Mensagem : `Parametro indevido.`});

  } else {
    var id = parseInt(reqId);

    Jogos.destroy({where: {id: id}}).then(() => {
      res.status(200).send({status : 200, Mensagem : `Registro ${id} deletado com sucesso.`});
    }); 
  } 
});

router.put("/game/:id", (req, res) => {
  var reqId = req.params.id;
  var {title, price, year} = req.body;

  if(isNaN(reqId)) {
    res.status(400).send({status : 400, Mensagem : `Parametro indevido`})

  } else {
    var id = parseInt(reqId);

    Jogos.findOne({where: {id: id}}).then( jogo => {
      if(jogo == undefined) {
        res.status(404).send({status: 404, mensagem: `Nenhum registro encontrado`});

      } else {
        if(title == undefined) {
          title = jogo.title;
        }

        if(price == undefined) {
          price = jogo.title;
        }

        if(year == undefined) {
          year = jogo.year;
        }

        jogo.update({title: title, price: price, year: year},
          {where: {id: id}}).then(() => {
            res.status(200).send({status : 200, Mensagem : `Registro ${id} atualizado com sucesso.`});
        })
      }
    });
  } 
});

module.exports = router;