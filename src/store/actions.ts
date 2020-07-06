import * as types from './mutation-types'

interface Commit {
  (type: string, payload: any): void
}

export const updateLoading = (context: { commit: Commit }, isLoading: boolean) => {
  context.commit(types.UPDATE_LOADING_STATUS, isLoading)
}
