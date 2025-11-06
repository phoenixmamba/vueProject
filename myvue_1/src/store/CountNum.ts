import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountNumStore = defineStore('countNum', {
  //state相当于组件中的data，用来存储状态数据
  state: () => {
    return { sum: parseInt(localStorage.getItem('sum') || '0') }
  },
  actions: {
    addNum(value: number) {
      this.sum += value
    },
  },
  getters: {
    bigSum(): number {
      return this.sum * 10
    },
  },
})

export const useCountNumStore2 = defineStore('countNum2', () => {
  const sum = ref(parseInt(localStorage.getItem('sum') || '0'))
  async function addNum(value: number) {
    sum.value += value
  }
  async function bigSum() {
    sum.value = sum.value * 10
  }
  return { sum, addNum, bigSum }
})
