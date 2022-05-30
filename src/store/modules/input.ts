import { MutationTree } from 'vuex'
import {
  InputOptionsKey, InputOptionsPayload, InputOptionsValue
} from '@/models/InputOptionsPayload'
import InputOptions from '@/models/InputOptions'

export type State = {
  valueFrom: string;
  optionsFrom: InputOptions;
  valueTo: string;
  optionsTo: InputOptions;
}

const state = (): State => ({
  valueFrom: '',
  optionsFrom: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    price: 0
  },
  valueTo: '',
  optionsTo: {
    id: 'usd',
    name: 'US Dollar',
    symbol: 'usd',
    price: 0
  }
})

export enum MutationTypes {
  SET_VALUE_TO = 'SET_VALUE_TO',
  SET_VALUE_FROM = 'SET_VALUE_FROM',
  SET_OPTION_TO = 'SET_OPTION_TO',
  SET_OPTION_FROM = 'SET_OPTION_FROM',
  SET_OPTIONS_TO = 'SET_OPTIONS_TO',
  SET_OPTIONS_FROM = 'SET_OPTIONS_FROM',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_VALUE_TO](state: S, payload: string): void
  [MutationTypes.SET_VALUE_FROM](state: S, payload: string): void
  [MutationTypes.SET_OPTION_TO](
    state: S,
    payload: InputOptionsPayload<InputOptionsKey, InputOptionsValue>,
  ): void
  [MutationTypes.SET_OPTION_FROM](
    state: S,
    payload: InputOptionsPayload<InputOptionsKey, InputOptionsValue>,
  ): void
  [MutationTypes.SET_OPTIONS_TO](
    state: S,
    payload: InputOptions,
  ): void
  [MutationTypes.SET_OPTIONS_FROM](
    state: S,
    payload: InputOptions,
  ): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_VALUE_TO](state, payload) {
    state.valueTo = payload
  },
  [MutationTypes.SET_VALUE_FROM](state, payload) {
    state.valueFrom = payload
  },
  [MutationTypes.SET_OPTION_TO](state, payload) {
    // @ts-ignore
    state.optionsTo[payload.key] = payload.value
  },
  [MutationTypes.SET_OPTION_FROM](state, payload) {
    // @ts-ignore
    state.optionsFrom[payload.key] = payload.value
  },
  [MutationTypes.SET_OPTIONS_TO](state, payload) {
    state.optionsTo = payload
  },
  [MutationTypes.SET_OPTIONS_FROM](state, payload) {
    state.optionsFrom = payload
  }
}

export default {
  state,
  mutations,
  namespaced: true
}