const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePasswordStrength = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
};

const register = async (req, res) => {
  const { name, email, password, role = 'employee', salary } = req.body;

  // Validate fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Formato de correo electrónico inválido' });
  }

  // Validate password strength
  // if (!validatePasswordStrength(password)) {
  //   return res.status(400).json({ 
  //     error: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números' 
  //   });
  // }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    const roleData = await Role.findOne({ where: { name: role } });
    if (!roleData) {
      return res.status(400).json({ error: `El rol '${role}' no es válido` });
    }

    if (salary && (typeof salary !== 'number' || salary < 0)) {
      return res.status(400).json({ error: 'El salario debe ser un número positivo' });
    }

    // Hash password with additional rounds for enhanced security
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      salary: salary || null,
      password: hashedPassword,
      RoleId: roleData.id,
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleData.name,
      },
      token,
    });
  } catch (error) {
    console.error('Error en el registro:', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: error.errors.map((e) => e.message).join(', ') 
      });
    }

    res.status(500).json({
      error: process.env.NODE_ENV === 'development'
        ? `Error interno: ${error.message}`
        : 'Error en el registro',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  try {
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role }] 
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user);

    res.json({
      user: {
        id: user.id,
        name: user.name || '',
        email: user.email,
        role: user.Role?.name || '', 
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

module.exports = {
  register,
  login,
};