const multer = require('multer')

const storage = multer.memoryStorage() //create a memory storage
const upload = multer({ storage: storage })

module.exports = upload
