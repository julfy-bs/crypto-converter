import { computed } from 'vue'
import CurrentData from '@/models/CurrentData'
import { useStore } from 'vuex'
import { formatCurrency as helperFormatCurrency } from '@/helpers/formatCurrency'
import { clearInput as helperClearInput } from '@/helpers/clearInput'
import { InputType } from '@/models/InputType'
import ChartPayload from '@/models/ChartPayload'
import { CurrencyOption } from '@/models/CurrencyOption'
import { CurrencyType } from '@/models/CurrencyType'

export const useConverter = () => {
  const store = useStore()
  const getCoinData = async (payload: string) => await store.dispatch('coin/getCoinData', payload)
  const getChartData = async (payload: ChartPayload) => await store.dispatch('coin/getChartData', payload)
  const labelArray = computed((): string[] => store.getters['coin/labelArray'])
  const pointsArray = computed((): string[] => store.getters['coin/pointsArray'])
  const currentData = computed((): CurrentData => store.state.coin.currentData)
  const setValueTo = (payload: string) => store.commit('input/SET_VALUE_TO', payload)
  const setValueFrom = (payload: string) => store.commit('input/SET_VALUE_FROM', payload)
  const setOptionsTo = (payload: CurrencyOption) => store.commit('input/SET_OPTIONS_TO', payload)
  const setOptionsFrom = (payload: CurrencyOption) => store.commit('input/SET_OPTIONS_FROM', payload)
  const valueFrom = computed({
    get: () => store.state.input.valueFrom,
    set: (newValue) => setValueFrom(newValue)
  })
  const optionsFrom = computed(() => store.state.input.optionsFrom)
  const valueTo = computed({
    get: () => store.state.input.valueTo,
    set: (newValue) => setValueTo(newValue)
  })
  const optionsTo = computed(() => store.state.input.optionsTo)
  const clearInput = (value: string, type: InputType): void => {
    const result = helperClearInput(value)
    type === 'from' ? setValueFrom(result) : setValueTo(result)
  }
  const activateCurrencyMask = (value: string, currency: string, type: InputType): void => {
    const result = helperFormatCurrency(+value, currency).toString()
    type === 'from' ? setValueFrom(result) : setValueTo(result)
  }
  const payload = computed((): ChartPayload => {
    return {
      id: optionsFrom.value.id,
      currency: optionsTo.value.symbol,
      days: '14',
      interval: ''
    }
  })
  const changePayload = async <K extends keyof ChartPayload>(key?: K, value?: ChartPayload[K]): Promise<void> => {
    try {
      if (key && value) {
        payload.value[key] = value
      }
      await getChartData(payload.value)
    } catch (e) {
      throw new Error(e)
    }
  }
  const convertMoney = (value: string, type: InputType) => {
    if (optionsFrom.value || optionsTo.value && valueFrom.value || valueTo.value) {
      let index: number
      if (type === 'from') {
        const symbol: CurrencyType = optionsTo.value.symbol
        index = currentData.value.price[symbol]
      } else {
        const symbol: CurrencyType = optionsTo.value.symbol
        index = 1 / currentData.value.price[symbol]
      }
      const number = (+value * +index)
      if (type === 'from') {
        const result = helperFormatCurrency(number, optionsTo.value.symbol).toString()
        setValueTo(result)
      } else {
        const result = helperFormatCurrency(number, optionsFrom.value.symbol).toString()
        setValueFrom(result)
      }
    }
  }
  const changeActiveOptions = (
    payload: CurrencyOption,
    type: InputType
  ) => {
    type === 'from' ? setOptionsFrom(payload) : setOptionsTo(payload)
  }
  const eraseInput = () => {
    const result = ''
    setValueFrom(result)
    setValueTo(result)
  }
  return {
    convertMoney,
    clearInput,
    eraseInput,
    activateCurrencyMask,
    changeActiveOptions,
    currentData,
    valueFrom,
    optionsFrom,
    valueTo,
    optionsTo,
    labelArray,
    pointsArray,
    getCoinData,
    getChartData,
    changePayload,
    payload,
    setOptionsFrom
  }
}