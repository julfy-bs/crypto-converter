import Wallet from '@/models/Wallet'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { WalletKey, WalletPayload, WalletValue } from '@/models/WalletPayload'
import { State as RootState } from '@/store'
import axios from 'axios'
import WalletRate from '@/models/WalletRate'
import { WalletRateAvailableValues, WalletRateKey, WalletRatePayload, WalletRateValue } from '@/models/WalletRatePayload'
import { convertValueToUsd } from '@/helpers/convertValueToUsd'

const coinsApi = 'https://api.coingecko.com/api/v3'
export type State = {
  wallet: Wallet;
  rate: WalletRate;
}

const state = (): State => ({
  wallet: {
    btc: {
      id: 'btc',
      name: 'Bitcoin',
      value: '6',
      isEditable: false
    },
    eth: {
      id: 'eth',
      name: 'Ethereum',
      value: '100',
      isEditable: false
    },
    usd: {
      id: 'usd',
      name: 'US Dollar',
      value: '100000',
      isEditable: false
    }
  },
  rate: {
    bitcoin: 0,
    ethereum: 0
  }
})

export enum MutationTypes {
  EDIT_CURRENCY = 'EDIT_CURRENCY',
  SAVE_CURRENCY_RATE = 'SAVE_CURRENCY_RATE',
  TOGGLE_EDITING = 'TOGGLE_EDITING',
  ADD_CURRENCY = 'ADD_CURRENCY',
  SUBTRACT_CURRENCY = 'SUBTRACT_CURRENCY'
}

export type Mutations<S = State> = {
  [MutationTypes.EDIT_CURRENCY](
    state: S,
    payload: WalletPayload<WalletKey, WalletValue>
  ): void
  [MutationTypes.SAVE_CURRENCY_RATE](
    state: S,
    payload: WalletRatePayload<WalletRateKey, WalletRateValue>
  ): void
  [MutationTypes.TOGGLE_EDITING](
    state: S,
    payload: WalletKey
  ): void
  [MutationTypes.ADD_CURRENCY](
    state: S,
    payload: WalletPayload<WalletKey, WalletValue>
  ): void
  [MutationTypes.SUBTRACT_CURRENCY](
    state: S,
    payload: WalletPayload<WalletKey, WalletValue>
  ): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.EDIT_CURRENCY](state: State, payload) {
    state.wallet[payload.key].value = (payload.value).toString()
  },
  [MutationTypes.SAVE_CURRENCY_RATE](state: State, payload) {
    state.rate[payload.key] = payload.value
  },
  [MutationTypes.TOGGLE_EDITING](state: State, payload) {
    state.wallet[payload].isEditable = !state.wallet[payload].isEditable
  },
  [MutationTypes.SUBTRACT_CURRENCY](state: State, payload) {
    state.wallet[payload.key].value = (+state.wallet[payload.key].value - +payload.value).toString()
  },
  [MutationTypes.ADD_CURRENCY](state: State, payload) {
    state.wallet[payload.key].value = (+state.wallet[payload.key].value + +payload.value).toString()
  },
}

export enum ActionTypes {
  getCoinPrice = 'getCoinPrice'
}

type ChartActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

interface Actions {
  [ActionTypes.getCoinPrice](
    { commit }: ChartActionContext,
    payload: {
      id: WalletRateAvailableValues,
      vs_currency: 'usd'
    },
  ): void
}

const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.getCoinPrice]({ commit }: ChartActionContext, payload) {
    try {
      const { data } = await axios.get(`${coinsApi}/simple/price/`, {
        params: {
          ids: payload.id,
          vs_currencies: payload.vs_currency
        }
      })
      commit(MutationTypes.SAVE_CURRENCY_RATE, { key: payload.id, value: data[payload.id][payload.vs_currency] })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export type Getters = {
  totalPrice(state: State): number;
  labelArray(state: State): string[];
  dataArray(state: State): number[];
  isWalletEditing(state: State): boolean;
}

const getters: GetterTree<State, RootState> & Getters = {
  totalPrice: (state: State) => {
    const priceArray = [
      convertValueToUsd(+state.wallet.btc.value, state.rate.bitcoin),
      convertValueToUsd(+state.wallet.eth.value, state.rate.ethereum),
      +state.wallet.usd.value
    ]
    return priceArray.reduce((a, b) => a + b)
  },
  labelArray: (state: State): string[] => [
    state.wallet.btc.name,
    state.wallet.eth.name,
    state.wallet.usd.name
  ],
  dataArray: (state: State): number[] => {
    const bitcoinsInUsd = convertValueToUsd(+state.wallet.btc.value, state.rate.bitcoin)
    const ethereumInUsd = convertValueToUsd(+state.wallet.eth.value, state.rate.ethereum)
    return [
      bitcoinsInUsd,
      ethereumInUsd,
      +state.wallet.usd.value
    ]
  },
  isWalletEditing: (state: State): boolean => [
    state.wallet.btc.isEditable,
    state.wallet.eth.isEditable,
    state.wallet.usd.isEditable
  ].some(item => item)

}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}