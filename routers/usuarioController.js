const express = require("express");
const user = express.Router();
const Usuario = require("../database/usuario");
const jwt = require("jsonwebtoken");
const jwtSecret = "j7j&ZdqUy*y7x&Ms5qy(&jlTzJ19ouiM";

user.post("/auth", (req, res) => {
  var {email, password} = req.body;

  var HATEOAS = [
    {
      href: `http://localhost:4567/user/auth`,
      method: `POST`,
      rel: `token_login`
    },
    {
      href: `http://localhost:4567/user/cadastro`,
      method: `POST`,
      rel: `cadastrar_user`
    },
  ]


  if(email != "" && password != "") {
    Usuario.findOne({where:{email: email}}).then(usuario => {

      if(usuario != undefined) {
        if(usuario.password == password) {
          jwt.sign({id: usuario.id, name: usuario.name, email: usuario.email},jwtSecret,{expiresIn: "1h"},(err, token) => {
            if(err) {
              res.status(400).send({status : 400, Mensagem : `Falha ao gerar o token de acesso.`});
            } else {
              res.status(200).send({status : 200, token : token, _link: HATEOAS});
            }
          });
        } else {
          res.status(401).send({status : 200, Mensagem : `Credenciais inválidas!`});
        }
      } else {
        res.status(404).send({status : 400, Mensagem : `Usuário não encontrado.`});
      }
    });
  } else {
    res.status(400).send({status : 400, Mensagem : `Usuário e senha não pode estar vazios.`});
  }
});

user.post("/cadastro", (req, res) => {
  var {name, email, password} = req.body;
  let vazio = false;

  var HATEOAS = [
    {
      href: `http://localhost:4567/user/auth`,
      method: `POST`,
      rel: `token_login`
    },
    {
      href: `http://localhost:4567/user/cadastro`,
      method: `POST`,
      rel: `cadastrar_user`
    },
  ]

  if(name == "") {
    vazio = true;
  }

  if(email == "") {
    vazio = true;
  }

  if(password == "") {
    vazio = true;
  }

  if(vazio == false) {
    Usuario.findOne({where: {email: email}}).then( usuario => {

      if(usuario == undefined) {
        Usuario.create({name: name, email: email, password: password}).then(() => {
          res.status(200).send({status : 200, Mensagem : `Usuário cadastrado com sucesso.`, _link: HATEOAS});
        });
        
      } else {
        res.status(302).send({status : 302, Mensagem : `Usuário já cadastrado.`});
      }
    });
  } else {
    res.status(404).send({status : 404, Mensagem : `Todos os campos tem que ser preenchidos.`});
  }
});

module.exports = user;