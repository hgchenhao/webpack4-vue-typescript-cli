import Vue from 'vue';
import Vuex, { GetterTree, MutationTree, ActionTree } from 'vuex'

import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';
import classroom from './modules/classroom';

Vue.use(Vuex);

interface GlobalState {
  [key: string]: any
}

const state: GlobalState = {
  token: null,
  user: {},
  isLoading: false
}

interface MyStore {
  state: object | Function
  getters: GetterTree<GlobalState, any>
  actions: ActionTree<GlobalState, any>
  mutations: MutationTree<GlobalState>
  modules: {
    [propName: string]: object;
  }
}

const store: MyStore = {
  state,
  getters,
  actions,
  mutations,
  modules: {
    classroom,
  },
}

export default new Vuex.Store(store)