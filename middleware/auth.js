const jwt = require("jsonwebtoken");
const jwtSecret = "j7j&ZdqUy*y7x&Ms5qy(&jlTzJ19ouiM";

function auth(req, res, next) {
  const authToken = req.headers['authorization'];

  if(authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];

    jwt.verify(token, jwtSecret, (e, data) => {
      if(e) {
        res.status(401).json({status: 401, Mensagem: `Token inválido.`});
      } else {
        req.token = token;
        req.loggedUser = {id: data.id, email: data.email};
        next();
      }
    });

  } else {
    res.status(401).json({status: 401, Mensagem: `Token inválido.`});
  }
}

module.exports = auth;