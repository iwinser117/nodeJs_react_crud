const { User, Role, Request } = require('../models');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Request, 
          attributes: ['id', 'title', 'description', 'status', 'createdAt'],
        },
        {
          model: Role,
          attributes: ['id', 'name'], 
        },
      ],
    });

    res.json({
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        salary: user.salary,
        role: user.Role ? user.Role.name : 'No asignado',
        role: user.Role ? user.Role.name : 'No asignado', 
        requests: user.Requests || [], 
      })),
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener usuarios' });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user; 

    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Request, 
          attributes: ['id', 'title', 'description', 'status', 'createdAt'],
        },
        {
          model: Role, 
          attributes: ['id', 'name'], 
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Construimos la respuesta
    const isAdmin = user.Role?.name === 'Administrador'; 
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        salary: isAdmin ? null : user.salary, 
        role: user.Role?.name || 'No asignado',
        requests: user.Requests || [], 
      },
    });
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener el usuario' });
  }
};


const createUser = async (req, res) => {
  const { name, email, password, role = 'employee', salary, entry_date } = req.body;

  try {
    // Verificar que el correo no esté registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    const userRole = await Role.findOne({ where: { name: role } });
    if (!userRole) {
      return res.status(400).json({ error: 'El rol proporcionado no es válido' });
    }

    if (userRole.name === 'employee' && !salary) {
      return res.status(400).json({ error: 'El salario es obligatorio para empleados' });
    }

    if(salary && isNaN(salary)) {
      salary = parseInt(salary, 10)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      salary: userRole.name === 'employee' ? parseInt(salary) : null,
      entry_date: entry_date || new Date(),
      RoleId: userRole.id,
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: userRole.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser
};
