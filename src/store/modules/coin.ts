import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { State as RootState } from '@/store'
import axios from 'axios'
import CurrentData from '@/models/CurrentData'
import Coin from '@/models/Coin'
import CoinPricePayload from '@/models/CoinPricePayload'

const coinsApi = 'https://api.coingecko.com/api/v3'
export type State = {
  chart: string[];
  coin: Coin;
  currentData: CurrentData;
}

const state = (): State => ({
  chart: [],
  coin: {
    id: '',
    symbol: '',
    name: '',
    market_data: {
      current_price: {
        usd: 0,
        eth: 0,
        btc: 0
      }
    },
    last_updated: ''
  },
  currentData: {
    id: '',
    name: '',
    symbol: '',
    price: {
      usd: 0,
      btc: 0,
      eth: 0
    },
  }
})

export enum MutationTypes {
  GET_CHART_DATA = 'GET_CHART_DATA',
  GET_COIN_DATA = 'GET_COIN_DATA',
  GET_CURRENT_DATA = 'GET_CURRENT_DATA'
}

export type Mutations<S = State> = {
  [MutationTypes.GET_CHART_DATA](state: S, payload: string[]): void
  [MutationTypes.GET_COIN_DATA](state: S, payload: Coin): void
  [MutationTypes.GET_CURRENT_DATA](state: S, payload: CurrentData): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.GET_CHART_DATA](state: State, payload) {
    state.chart = payload
  },
  [MutationTypes.GET_COIN_DATA](state: State, payload) {
    state.coin = payload
  },
  [MutationTypes.GET_CURRENT_DATA](state, payload) {
    state.currentData = payload
  }
}

export enum ActionTypes {
  getChartData = 'getChartData',
  getCoinData = 'getCoinData',
  getCoinPrice = 'getCoinPrice'
}

type ChartActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

interface Actions {
  [ActionTypes.getChartData](
    { commit }: ChartActionContext,
    payload: { id: string; currency: string; days: string; interval: string; },
  ): void
  [ActionTypes.getCoinData](
    { commit }: ChartActionContext,
    payload: string,
  ): void
}

const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.getChartData](
    { commit },
    payload: { id: string; currency: string; days: string; interval: string; },
  ) {
    try {
      const { data } = await axios.get(`${coinsApi}/coins/${payload.id}/market_chart/`, {
        params: {
          vs_currency: payload.currency,
          days: payload.days,
          interval: payload.interval
        },
      })
      commit(MutationTypes.GET_CHART_DATA, data.prices)
    } catch (e) {
      throw new Error(e)
    }
  },
  async [ActionTypes.getCoinData](
    { commit },
    payload: string,
  ) {
    try {
      const { data } = await axios.get(`${coinsApi}/coins/${payload}`, {
        params: {
          localization: false,
          tickers: false,
          community_data: false,
          developer_data: false,
          sparkline: false
        }
      })
      commit(MutationTypes.GET_COIN_DATA, data)
      commit(MutationTypes.GET_CURRENT_DATA, {
        id: data.id,
        name: data.name,
        symbol: data.symbol,
        price: {
          usd: data.market_data.current_price.usd,
          eth: data.market_data.current_price.eth,
          btc: data.market_data.current_price.btc
        }
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export type Getters = {
  pointsArray(state: State): number[];
  labelArray(state: State): string[];
}

const getters: GetterTree<State, RootState> & Getters = {
  pointsArray: (state: State) => {
    const array: number[] = []
    state.chart.forEach(item => {
      const value = Number(item[1]).toFixed(2)
      array.push(+value)
    })
    return array
  },
  labelArray: (state: State) => {
    const array: string[] = []
    state.chart.forEach(item => {
      const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: false
      }
      const result = new Intl.DateTimeFormat('eu-EU', dateOptions).format(new Date(item[0]))
      array.push(result)
    })
    return array
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
