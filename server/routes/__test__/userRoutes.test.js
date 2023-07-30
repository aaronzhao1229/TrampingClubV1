const request = require('supertest')
const server = require('../../server')
const db = require('../../db/userDb')

jest.mock('../../db/userDb')
jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

const existingFakeUsers = [
  { username: 'existing1', password: '123456', email: 'existing1@test.com' },
  { username: 'existing2', password: '123456', email: 'existing2@test.com' },
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
