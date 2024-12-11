const db = require('../config/database')
const bcrypt = require('bcryptjs')

const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, email, role FROM users')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const createUser = async (req, res) => {
  const { name, email, password, role = 'employee' } = req.body
  try {
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email])
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role', 
      [name, email, hashedPassword, role]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = {
  getUsers,
  createUser,
}