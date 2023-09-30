import store from '../../../store'
import { setCredentials, logOut } from '../authSlice'

describe('authSlice', () => {
  it('initial state', () => {
    const state = store.getState().auth
    expect(state).toEqual({
      username: null,
      accessToken: null,
      userRoles: null,
    })
  })

  it('setCredential and log out', () => {
    store.dispatch(
      setCredentials({
        username: 'test',
        accessToken: 'test',
        userRoles: ['test1', 'test2'],
      })
    )
    const state = store.getState().auth
    expect(state.accessToken).toBe('test')

    store.dispatch(logOut())

    const newState = store.getState().auth
    expect(newState).toEqual({
      username: null,
      accessToken: null,
      userRoles: null,
    })
  })
})
