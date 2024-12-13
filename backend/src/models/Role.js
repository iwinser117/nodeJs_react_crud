const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

Role.findOrCreateCustom = async function ({ where }) {
    try {
      const [role, created] = await sequelize.models.Role.findOrCreate({ where });
      return role;
    } catch (error) {
      throw error;
    }
  };
  

module.exports = Role;