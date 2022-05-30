import { Ref, ref } from 'vue'
import { Mutation, useStore } from 'vuex'
import { WalletKey, WalletPayload, WalletValue } from '@/models/WalletPayload'

interface UseArithmeticReturn {
  isSummation: Ref<boolean>;
  toggleArithmetic: Function;
  addCurrency: Mutation<WalletPayload<WalletKey, WalletValue>>;
  subtractCurrency: Mutation<WalletPayload<WalletKey, WalletValue>>;
}

export const useArithmetic = (): UseArithmeticReturn => {
  const store = useStore()
  const isSummation = ref<boolean>(true)
  const toggleArithmetic = () => isSummation.value = !isSummation.value
  const addCurrency = (payload: WalletPayload<WalletKey, WalletValue>) => store.commit('wallet/ADD_CURRENCY', payload)
  const subtractCurrency = (payload: WalletPayload<WalletKey, WalletValue>) => store.commit('wallet/SUBTRACT_CURRENCY', payload)

  return {
    isSummation,
    toggleArithmetic,
    addCurrency,
    subtractCurrency
  }
}