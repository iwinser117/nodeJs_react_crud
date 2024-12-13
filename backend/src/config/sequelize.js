const { Sequelize } = require('sequelize');
require('dotenv').config();

// Conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, //esto me genera el detallado del errods, muchas lineas para prueba descomentar despues
  }
);

module.exports = sequelize;