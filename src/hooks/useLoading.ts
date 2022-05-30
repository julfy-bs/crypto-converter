import { computed, ComputedRef } from 'vue'
import { Mutation, useStore } from 'vuex'

interface useLoadingReturn {
  isLoading: ComputedRef<boolean>;
  toggleLoading: Mutation<void>
}

export const useLoading = (): useLoadingReturn => {
  const store = useStore()
  const isLoading = computed(() => store.state.loading.isLoading)

  const toggleLoading = () => store.commit('loading/TOGGLE_LOADING')

  return {
    isLoading,
    toggleLoading
  }
}