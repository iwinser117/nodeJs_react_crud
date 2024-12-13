const { Request, User } = require('../models');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const { name, email, password, role, salary } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, email, contraseña, y rol.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      RoleId: role,
      salary: role === 'employee' ? salary : null,
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      RoleId: newUser.RoleId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al crear el usuario.' });
  }
};

const assignRequest = async (req, res) => {
  const { userId, title, description, status = 'pending' } = req.body;

  if (!userId || !title || !description) {
    return res.status(400).json({ error: 'Los campos userId, title y description son obligatorios.' });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const newRequest = await Request.create({
      userId,
      title,
      description,
      status,
    });

    res.status(201).json({
      id: newRequest.id,
      userId: newRequest.userId,
      title: newRequest.title,
      description: newRequest.description,
      status: newRequest.status,
      createdAt: newRequest.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al asignar la solicitud.' });
  }
};

module.exports = {
    createUser,
    assignRequest
}