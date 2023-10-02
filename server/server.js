const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const fruitRoutes = require('./routes/fruits')
const albumRoutes = require('./routes/albumRoutes')
const videoRoutes = require('./routes/videoRoutes')
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
server.use('/api/v1/videos', videoRoutes)
server.use('/api/v1/programme', programRoutes)
server.use('/api/v1/user', userRoutes)
server.use('/api/v1/ses', sesRoutes)

// server.get('*', (req, res) => {
//   res.sendFile(path.resolve('server/public/index.html'))
// })

// Get the absolute path to the directory where your script is located
const scriptDir = path.dirname(process.argv[1])

// Construct the absolute path to 'index.html'
const indexPath = path.resolve(scriptDir, 'public', 'index.html')

server.get('*', (req, res) => {
  res.sendFile(indexPath)
})

module.exports = server
