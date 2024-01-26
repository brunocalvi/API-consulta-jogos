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
  let vazio = false;

  if(title == "") {
    vazio = true;
  }

  if(price == "") {
    vazio = true;
  }

  if(year == "") {
    vazio = true;
  }

  if(vazio == false) {
    if(isNaN(price) || isNaN(year)) {
      res.status(400).send({status : 400, Mensagem : `Esses campos precisam ser numeros.`});

    } else {
      Jogos.create({title: title, price: price, year: year}).then(() => {
        res.status(200).send({status : 200, Mensagem : `Jogo cadastrado com sucesso.`});
      });
    } 

  } else {
    res.status(400).send({status : 400, Mensagem : `Não é aceito campos vazios.`});
  }
});

router.get("/game/:id", (req, res) => {
  var reqId = req.params.id;

  if(isNaN(reqId)) {
    res.status(400).send({status : 400, Mensagem : `ID esta errado.`});

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
    res.status(400).send({status : 400, Mensagem : `ID esta errado.`});

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
    res.status(400).send({status : 400, Mensagem : `ID esta errado.`})

  } else {
    var id = parseInt(reqId);

    Jogos.findOne({where: {id: id}}).then( jogo => {
      if(jogo == undefined) {
        res.status(404).send({status: 404, mensagem: `Nenhum registro encontrado`});

      } else {
        if(title == "") {
          title = jogo.title;
        }

        if(price == "") {
          price = jogo.title;
        }

        if(year == "") {
          year = jogo.year;
        }

        if(isNaN(price) || isNaN(year)) {
          res.status(400).send({status : 400, Mensagem : `Esses campos precisam ser numeros.`});
    
        } else {
          jogo.update({title: title, price: price, year: year},
            {where: {id: id}}).then(() => {
              res.status(200).send({status : 200, Mensagem : `Registro ${id} atualizado com sucesso.`});
          })
        }
      }
    });
  }
});

module.exports = router;