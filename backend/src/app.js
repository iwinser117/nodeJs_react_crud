const express = require('express')
const userRoutes = require('./routes/userRoutes')
const requestsRoutes = require('./routes/requestRoutes')
const aothRoutes = require('./routes/authRoutes')
const cors = require('cors')

require('dotenv').config()  

const app = express()

const corsConfig = {
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false
}

app.use(cors(corsConfig))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
app.use('/api/requests', requestsRoutes)
app.use('/api/auth', aothRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo salió mal', 
    message: err.message 
  });
});

module.exports = app