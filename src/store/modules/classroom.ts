import * as types from '../mutation-types'

interface Commit {
  (type: string, payload: any): void
}

const state = {
  joinStatus: false, // 当前计划是否已加入学习
}

const mutations = {
  [types.JOIN_COURSE](state: { joinStatus: boolean }, payload: boolean) {
    state.joinStatus = payload
  },
}

const actions = {
  setJoinStatus(context: { commit: Commit }, joinStatus: boolean) {
    context.commit(types.JOIN_COURSE, joinStatus)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
