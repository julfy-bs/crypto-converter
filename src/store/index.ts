import { createStore } from 'vuex'
import coin, {
  State as CoinState,
} from '@/store/modules/coin.ts'


export type State = {
  coin: CoinState
}

export default createStore({
  modules: {
    coin
  }
})
