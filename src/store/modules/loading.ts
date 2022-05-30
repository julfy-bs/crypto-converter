import { MutationTree } from 'vuex'

export type State = {
  isLoading: boolean;
}

const state = (): State => ({
  isLoading: false
})

export enum MutationTypes {
  TOGGLE_LOADING = 'TOGGLE_LOADING',
}

export type Mutations<S = State> = {
  [MutationTypes.TOGGLE_LOADING](
    state: S,
    payload: string[]
  ): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.TOGGLE_LOADING](state: State) {
    state.isLoading = !state.isLoading
  }
}

export default {
  state,
  mutations,
  namespaced: true
}