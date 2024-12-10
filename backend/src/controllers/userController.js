const db = require('../config/database')
const bcrypt = require('bcryptjs')
const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM test')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const createUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await db.query('INSERT INTO test (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword])
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getUsers,
  createUser,
}