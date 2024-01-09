const Sequelize = require("sequelize");
const conn = require("./conn");

const Jogo = conn.define("tb_jogos", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  }
});

// Força a criação da Tabela
//Jogo.sync({force: true});

module.exports = Jogo;