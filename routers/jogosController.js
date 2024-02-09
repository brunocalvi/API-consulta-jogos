const express = require("express");
const router = express.Router();
const Jogos = require("../database/jogos");
const auth = require("../middleware/auth");

router.get("/listaGames", auth, (req, res) => {

  var HATEOAS = [
    {
      href: `http://localhost:4567/api/deletaGame/0`,
      method: `DELETE`,
      rel: `delete_game`
    },
    {
      href: `http://localhost:4567/api/listaGames`,
      method: `GET`,
      rel: `get_game`
    },
  ]

  Jogos.findAll({raw: true, order:[['id','DESC']]})
  .then( jogos => {
    res.status(200).json({status: 200, Mensagem: `Lista de jogos`, jogos, _links: HATEOAS });
  });
});

router.post("/cadastraGame", auth, (req, res) => {
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
      res.status(400).send({status: 400, Mensagem: `Esses campos precisam ser numeros.`});

    } else {
      Jogos.create({title: title, price: price, year: year}).then(() => {
        res.status(200).send({status: 200, Mensagem: `Jogo cadastrado com sucesso.`});
      });
    } 

  } else {
    res.status(400).send({status: 400, Mensagem: `Não é aceito campos vazios.`});
  }
});

router.get("/consultaGame/:id", auth, (req, res) => {
  var reqId = req.params.id;

  if(isNaN(reqId)) {
    res.status(400).send({status: 400, Mensagem: `ID esta errado.`});

  } else {
    var id = parseInt(reqId);

    var HATEOAS = [
      {
        href: `http://localhost:4567/api/deletaGame/${id}`,
        method: `DELETE`,
        rel: `delete_game`
      },
      {
        href: `http://localhost:4567/api/atualizaGame/${id}`,
        method: `PUT`,
        rel: `edit_game`
      },
      {
        href: `http://localhost:4567/api/consultaGame/${id}`,
        method: `GET`,
        rel: `consul_game`
      },
      {
        href: `http://localhost:4567/api/listaGames`,
        method: `GET`,
        rel: `get_all_game`
      },
    ]

    Jogos.findOne({where: {id: id}}).then( jogo => {
      if(jogo == undefined) {
        res.status(404).send({status: 404, Mensagem: `Nenhum registro encontrado.`});

      } else {
        res.status(200).json({status: 200, Mensagem: `jogo`, jogo, _links: HATEOAS});
      }
    });
  } 
});

router.delete("/deletaGame/:id", auth, (req, res) => {
  var reqId = req.params.id;

  if(isNaN(reqId)) {
    res.status(400).send({status: 400, Mensagem: `ID esta errado.`});

  } else {
    var id = parseInt(reqId);

    Jogos.destroy({where: {id: id}}).then(() => {
      res.status(200).send({status: 200, Mensagem: `Registro ${id} deletado com sucesso.`});
    }); 
  } 
});

router.put("/atualizaGame/:id", auth, (req, res) => {
  var reqId = req.params.id;
  var {title, price, year} = req.body;

  if(isNaN(reqId)) {
    res.status(400).send({status: 400, Mensagem: `ID esta errado.`})

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
          res.status(400).send({status: 400, Mensagem: `Esses campos precisam ser numeros.`});
    
        } else {
          jogo.update({title: title, price: price, year: year},
            {where: {id: id}}).then(() => {
              res.status(200).send({status: 200, Mensagem: `Registro ${id} atualizado com sucesso.`});
          })
        }
      }
    });
  }
});

module.exports = router;