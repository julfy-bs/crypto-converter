import { computed, ComputedRef } from 'vue'
import { Mutation, useStore } from 'vuex'
import Wallet from '@/models/Wallet'
import { WalletKey, WalletPayload, WalletValue } from '@/models/WalletPayload'
import CoinPricePayload from '@/models/CoinPricePayload'

interface useWalletReturn {
  wallet: ComputedRef<Wallet>;
  totalPrice: ComputedRef<number>;
  labelArray: ComputedRef<string[]>;
  dataArray: ComputedRef<number[]>;
  editCurrency: Mutation<WalletPayload<WalletKey, WalletValue>>;
  getCoinPrice: Mutation<CoinPricePayload>;
  toggleEditing: Mutation<WalletKey>;
  isWalletEditing: ComputedRef<boolean>;
}

export const useWallet = (): useWalletReturn => {
  const store = useStore()
  const wallet = computed((): Wallet => store.state.wallet.wallet)
  const totalPrice = computed(() => store.getters['wallet/totalPrice'])
  const labelArray = computed(() => store.getters['wallet/labelArray'])
  const dataArray = computed(() => store.getters['wallet/dataArray'])
  const isWalletEditing = computed(() => store.getters['wallet/isWalletEditing'])
  const editCurrency = (payload: WalletPayload<WalletKey, WalletValue>) => store.commit('wallet/EDIT_CURRENCY', payload)
  const getCoinPrice = (payload: CoinPricePayload) => store.dispatch('wallet/getCoinPrice', payload)
  const toggleEditing = (payload: WalletKey) => store.commit('wallet/TOGGLE_EDITING', payload)
  return {
    wallet,
    totalPrice,
    labelArray,
    dataArray,
    editCurrency,
    getCoinPrice,
    toggleEditing,
    isWalletEditing
  }
}