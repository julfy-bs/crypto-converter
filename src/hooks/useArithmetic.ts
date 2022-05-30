import { Ref, ref } from 'vue'
import { Mutation, useStore } from 'vuex'
import { WalletKey, WalletPayload, WalletValue } from '@/models/WalletPayload'
import { CurrencyType } from '@/models/CurrencyType'

interface UseArithmeticReturn {
  isSummation: Ref<boolean>;
  toggleArithmetic: Function;
  addCurrency: Mutation<{ key: CurrencyType, value: string }>;
  subtractCurrency: Mutation<{ key: CurrencyType, value: string }>;
}

export const useArithmetic = (): UseArithmeticReturn => {
  const store = useStore()
  const isSummation = ref<boolean>(true)
  const toggleArithmetic = () => isSummation.value = !isSummation.value
  const addCurrency = (payload: { key: CurrencyType, value: string }) => store.commit('wallet/ADD_CURRENCY', payload)
  const subtractCurrency = (payload: { key: CurrencyType, value: string }) => store.commit('wallet/SUBTRACT_CURRENCY', payload)

  return {
    isSummation,
    toggleArithmetic,
    addCurrency,
    subtractCurrency
  }
}