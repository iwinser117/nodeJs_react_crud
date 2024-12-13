    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/sequelize');
    const Role = require('./Role');

    const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.FLOAT,
        allowNull: true, 
        validate: {
        isSalaryRequired(value) {
            if (this.RoleId && this.RoleId === 1 && (value === null || value === undefined)) {
            throw new Error('El salario es obligatorio para empleados.');
            }
        },
        },
    },
    entry_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue : new Date(),
    },
    RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: Role,
        key: 'id',
        },
    },
    });

    User.belongsTo(Role, { foreignKey: 'RoleId' });
    Role.hasMany(User, { foreignKey: 'RoleId' });

    module.exports = User;
