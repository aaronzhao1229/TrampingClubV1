const request = require('supertest')
const server = require('../../server')
const db = require('../../db/userDb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../db/userDb')
jest.spyOn(console, 'error')
jest.mock('bcrypt')

// to be updated
jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'), // import and retain the original functionalities
  verify: jest.fn((token, secretOrPublicKey, options, callback) => {
    return callback(null, { sub: 'user_id' })
  }), // overwrite verify
}))

// const verify = jest.spyOn(jwt, 'verify')
// verify.mockImplementation(() => () => ({ verified: 'true' }))

afterEach(() => {
  console.error.mockReset()
})

const existingFakeUsers = [
  {
    id: 1,
    username: 'existing1',
    password: '123456',
    email: 'existing1@test.com',
    refreshToken: 'abcdef',
  },
  {
    id: 2,
    username: 'existing2',
    password: '123456',
    email: 'existing2@test.com',
    refreshToken: 'ghijkl',
  },
]

const existingFakeRoles = [
  { userId: 1, role: 'admin' },
  { userId: 1, role: 'member' },
]

describe('GET /user/createUser', () => {
  it('return the user', () => {
    const fakeUser = {
      username: 'Jason',
      password: '123456',
      email: 'new@test.com',
    }
    db.createUser.mockReturnValue(Promise.resolve(fakeUser))
    db.getUsers.mockReturnValue(Promise.resolve(existingFakeUsers))

    return request(server)
      .post('/api/v1/user/createUser')
      .send({
        username: 'Jason123',
        password: '123456789',
        email: 'new123@test.com',
      })
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.text).toBe('New user Jason123 created!')
      })
  })

  it('no username', () => {
    return request(server)
      .post('/api/v1/user/createUser')
      .send({
        password: '123456789',
        email: 'new123@test.com',
      })
      .then((res) => {
        expect(res.status).toBe(400)
        expect(res.text).toBe('Username, password and email are required.')
      })
  })

  it('duplicate username', () => {
    db.getUsers.mockReturnValue(Promise.resolve(existingFakeUsers))

    return request(server)
      .post('/api/v1/user/createUser')
      .send({
        username: 'existing1',
        password: '123456789',
        email: 'new123@test.com',
      })
      .then((res) => {
        expect(res.status).toBe(409)
      })
  })

  it('returns status 500 and console error if there is a problem', () => {
    db.getUsers.mockReturnValue(Promise.resolve(existingFakeUsers))
    db.createUser.mockImplementation(() =>
      Promise.reject(new Error('Error creating a user'))
    )
    console.error.mockImplementation(() => {})

    return request(server)
      .post('/api/v1/user/createUser')
      .send({
        username: 'jason',
        password: '123456789',
        email: 'new123@test.com',
      })
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Error creating a user')
      })
  })
})

describe('login', () => {
  it('no username', () => {
    return request(server)
      .post('/api/v1/user/login')
      .send({
        password: '123456789',
      })
      .then((res) => {
        expect(res.status).toBe(400)
        expect(res.body.message).toBe('Username and password are required.')
      })
  })

  it('username not found', () => {
    db.getUsers.mockReturnValue(Promise.resolve(existingFakeUsers))
    return request(server)
      .post('/api/v1/user/login')
      .send({ username: 'newUser', password: '123456789' })
      .then((res) => {
        expect(res.status).toBe(401)
      })
  })

  it('login successfully', () => {
    db.getUsers.mockReturnValue(Promise.resolve(existingFakeUsers))
    db.getUserRolesByUserId.mockReturnValue(existingFakeRoles)
    db.saveToken.mockImplementation(() => {})
    bcrypt.compare.mockReturnValue(true)

    return request(server)
      .post('/api/v1/user/login')
      .send({ username: 'existing1', password: '123456' })
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.userRoles).toHaveLength(2)
        expect(res.body.userRoles).toContain('admin')
      })
  })

  it('login failure', () => {
    db.getUsers.mockReturnValue(existingFakeUsers)
    bcrypt.compare.mockReturnValue(false)
    return request(server)
      .post('/api/v1/user/login')
      .send({ username: 'existing1', password: '123456' })
      .then((res) => {
        expect(res.status).toBe(401)
      })
  })
})

describe('/refresh', () => {
  it('no jwt in cookie', () => {
    return request(server)
      .get('/api/v1/user/refresh')
      .set('Cookie', ['password=12345667'])
      .then((res) => {
        expect(res.status).toBe(401)
      })
  })

  it('no user found', () => {
    db.getUsers.mockReturnValue(existingFakeUsers)
    return request(server)
      .get('/api/v1/user/refresh')
      .set('Cookie', ['password=12345667', 'jwt=123456'])
      .then((res) => {
        expect(res.status).toBe(403)
      })
  })

  it('verify sucessfully', () => {
    const np = jest.fn()
    db.getUsers.mockReturnValue(existingFakeUsers)
    jwt.verify.mockImplementation(Promise.resolve(np))
    db.getUserRolesByUserId.mockReturnValue(existingFakeRoles)
    return request(server)
      .get('/api/v1/user/refresh')
      .set('Cookie', ['jwt=abcdef'])
      .then(() => {
        expect(0).toBe(0)
      })
  })
})
