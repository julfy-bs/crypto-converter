import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { State as RootState } from '@/store'
import axios from 'axios'

const coinsApi = 'https://api.coingecko.com/api/v3'

export type State = {
  chart: string[]
}

const state = (): State => ({
  chart: []
})

export enum MutationTypes {
  GET_CHART_DATA = 'GET_CHART_DATA',
}

export type Mutations<S = State> = {
  [MutationTypes.GET_CHART_DATA](state: S, payload: string[]): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.GET_CHART_DATA](state: State, payload) {
    state.chart = payload
  }
}

export enum ActionTypes {
  getChartData = 'getChartData'
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
      // console.log(data.prices)
      commit(MutationTypes.GET_CHART_DATA, data.prices)
    } catch (e) {
      throw new Error(e)
    }
  }
}

export type Getters = {
  pointsArray(state: State): number[]
  labelArray(state: State): string[]
}

const getters: GetterTree<State, RootState> & Getters = {
  pointsArray: (state: State): number[] => {
    const array: number[] = []
    state.chart.forEach(item => {
      const value = Number(item[1]).toFixed(2)
      array.push(+value)
    })
    return array
  },
  labelArray: (state: State): string[] => {
    const array: string[] = []
    state.chart.forEach(item => {
      const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: false
      }
      const result =  new Intl.DateTimeFormat('eu-EU', dateOptions).format(new Date(item[0]))
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
