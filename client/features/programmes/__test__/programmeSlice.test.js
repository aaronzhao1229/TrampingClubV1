import store from '../../../store'
import { fetchProgrammesAsync, setProgrammes } from '../programmeSlice'
import agent from '../../../app/apis/agent'

jest.mock('../../../app/apis/agent')
jest.spyOn(console, 'error')

const mockProgrammes = [
  {
    programmeId: 1,
    programmeCategory: 'tramp',
    tripName: 'Peak Hill',
    title: '08-09-2022',
  },
  {
    programmeId: 2,
    programmeCategory: 'walk',
    tripName: 'Castle Hill',
    title: '08-10-2022',
  },
]

beforeEach(() => {
  jest.clearAllMocks()
})

describe('programme slice', () => {
  it('initial state', async () => {
    const state = store.getState().programmes
    expect(state.programmes).toHaveLength(0)
    expect(state.status).toBe('idle')
    expect(state.programmeLoaded).toBe(false)
  })

  it('fetch programme data and set programme', async () => {
    agent.programmes.getProgrammes.mockImplementation(() =>
      Promise.resolve(mockProgrammes)
    )
    const result = await store.dispatch(fetchProgrammesAsync())
    const programmes = result.payload

    expect(result.type).toBe('programmes/fetchProgrammesAsync/fulfilled')
    expect(programmes).toHaveLength(2)
    expect(programmes[1].tripName).toBe('Castle Hill')

    const state = store.getState().programmes
    expect(state).toEqual({
      programmes,
      status: 'idle',
      programmeLoaded: true,
    })

    store.dispatch(setProgrammes())
    const newState = store.getState().programmes
    expect(newState.programmeLoaded).toBe(false)
  })

  it('fetch programme and error', async () => {
    agent.programmes.getProgrammes.mockImplementation(() =>
      Promise.reject(new Error('Error fetching programme'))
    )
    console.error.mockImplementation(() => {})
    const result = await store.dispatch(fetchProgrammesAsync())

    expect(result.type).toBe('programmes/fetchProgrammesAsync/rejected')

    expect(console.error).toHaveBeenCalledWith({
      error: 'Error fetching programme',
    })
    const state = store.getState().programmes
    expect(state.status).toBe('idle')
  })
})
