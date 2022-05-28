import { computed } from 'vue'
import CurrentData from '@/models/CurrentData'
import { useStore } from 'vuex'

export const useConverter = () => {
  const store = useStore()
  const currentData = computed((): CurrentData => store.getters['coin/currentData'])
  const valueFrom = computed(() => 1)
  const valueTo = computed(() => 1)
  const convertMoney = () => {
    if (currentData.value && valueFrom || valueTo) {
      return currentData.value.price * valueFrom.value
    } else {
      return false
    }
  }

  return {
    convertMoney
  }
}