const User = require('./User');
const Role = require('./Role');
const Request = require('./Request');
const sequelize = require('../config/sequelize'); // Asegúrate de que la ruta es correcta


User.belongsTo(Role, { foreignKey: 'RoleId' });
Role.hasMany(User, { foreignKey: 'RoleId' });

const initModels = async () => {
  try {
    console.log('Sincronizando la base de datos...');
    await sequelize.sync({ force: true }); // ¡CUIDADO: Elimina datos existentes!
    console.log('Base de datos sincronizada.');

    console.log('Creando roles predeterminados...');
    await Role.findOrCreateCustom({ where: { name: 'employee' } });
    await Role.findOrCreateCustom({ where: { name: 'administrator' } });
    console.log('Roles creados.');
  } catch (error) {
    console.error('Error durante la sincronización:', error);
  }
};

module.exports = { initModels, User, Role, Request };
