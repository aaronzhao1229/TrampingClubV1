const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const fruitRoutes = require('./routes/fruits')
const albumRoutes = require('./routes/albumRoutes')
const programRoutes = require('./routes/programmeRoutes')
const userRoutes = require('./routes/userRoutes')
const sesRoutes = require('./routes/sesRoutes')
const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
// middleware for cookies
server.use(cookieParser())

server.use('/api/v1/fruits', fruitRoutes)
server.use('/api/v1/album', albumRoutes)
server.use('/api/v1/programme', programRoutes)
server.use('/api/v1/user', userRoutes)
server.use('/api/v1/ses', sesRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
