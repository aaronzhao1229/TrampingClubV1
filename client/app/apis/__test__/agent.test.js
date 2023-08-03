// import nock from 'nock'
// import agent from '../agent'
// import axios from '../axios'
// jest.mock('../axios')

// describe('getProgrammes', () => {
//   it('returns programmes', () => {
//     const scope = nock('http://localhost')
//       .get(`/api/v1/programme`)
//       .reply(200, { id: 1, firstName: 'Will' })
//     return agent.programmes.getProgrammes().then((result) => {
//       expect(result.firstName).toBe('Will')
//       expect(scope.isDone()).toBe(true)
//     })
//   })
// })
