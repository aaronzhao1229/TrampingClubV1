const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getUsers } = require('../userDb')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getUsers', () => {
  it('gets all users from db', () => {
    // expect.assertions(5)
    return getUsers(testDb).then((res) => {
      expect(res).toHaveLength(1)
      expect(res[0].username).toBe('test1234')
    })
  })
})
