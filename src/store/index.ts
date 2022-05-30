import { createStore } from 'vuex'
import coin, {
  State as CoinState,
} from '@/store/modules/coin.ts'
import input, {
  State as InputState,
} from '@/store/modules/input.ts'
import wallet, {
  State as WalletState,
} from '@/store/modules/wallet.ts'
import loading, {
  State as LoadingState,
} from '@/store/modules/loading.ts'

export type State = {
  coin: CoinState;
  input: InputState;
  wallet: WalletState;
  loading: LoadingState;
}

export default createStore({
  modules: {
    coin,
    input,
    wallet,
    loading
  }
})
