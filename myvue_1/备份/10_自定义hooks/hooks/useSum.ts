import { ref, computed } from 'vue'

export default function useSum() {
  const sum = ref(0)
  const bigSum = computed(() => sum.value * 10)
  function add() {
    sum.value++
  }

  return { sum, add, bigSum }
}
