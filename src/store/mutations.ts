import * as types from './mutation-types'

export default {
  [types.UPDATE_LOADING_STATUS](state: { isLoading: boolean }, payload: boolean) {
    state.isLoading = payload
  },
}
