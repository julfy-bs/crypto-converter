import { createStore } from 'vuex'
import coin, {
  State as CoinState,
} from '@/store/modules/coin.ts'
import input, {
  State as InputState,
} from '@/store/modules/input.ts'

export type State = {
  coin: CoinState,
  input: InputState
}

export default createStore({
  modules: {
    coin,
    input
  }
})
