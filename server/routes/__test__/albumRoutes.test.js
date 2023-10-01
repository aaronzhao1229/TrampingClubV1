const request = require('supertest')
const server = require('../../server')
const db = require('../../db/albumDb')
const upload = require('../../middleware/multer')
const {
  uploadImageToS3,
  getImageFromS3,
  deleteImageFromS3,
} = require('../../s3')
const verifyJWT = require('../../middleware/verifyJWT')

jest.mock('../../db/albumDb')
jest.spyOn(console, 'error')
jest.mock('../../s3')

const fakeMulterArray = (req, res, next) => {
  req.files = [{ filename: 'image1' }, { filename: 'image2' }]
  next()
}

jest.mock('../../middleware/multer', () => {
  return {
    array: jest.fn().mockReturnValue(fakeMulterArray),
  }
})

jest.mock('../../middleware/verifyJWT')

beforeAll(() => {
  verifyJWT.mockImplementation((req, res, next) => {
    req.headers = { authorization: 'Bearer 1234567890' }
    next()
  })
})

afterEach(() => {
  console.error.mockReset()
})

describe('/uploadImage', () => {
  it('createPhotos successfully', () => {
    uploadImageToS3.mockImplementation(() => {})
    db.createPhotos.mockImplementation(() =>
      Promise.resolve({ id: 1, name: 'Avalanche Peak' })
    )
    return request(server)
      .post('/api/v1/album/uploadImage', verifyJWT, upload.array('image'))
      .send({
        albumName: 'test1',
        tripDate: '01/10/2023',
      })
      .then((res) => {
        expect(res.status).toBe(200)
      })
  })
})
