const sequelize = require('../config/sequelize');
const User = require('./User');
const Request = require('./Request');
const Role = require('./Role');

const initModels = async () => {
  try {
    await Role.findOrCreateCustom({ where: { name: 'employee' } });
    await Role.findOrCreateCustom({ where: { name: 'administrator' } });

    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

module.exports = {
  initModels,
  User,
  Request,
  Role,
};