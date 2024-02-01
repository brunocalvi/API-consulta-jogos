const Sequelize = require("sequelize");
const conn = require("./conn");

const Usuario = conn.define("tb_usuario", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  } 
});

// Força a criação da Tabela
//Usuario.sync({force: true});

module.exports = Usuario;