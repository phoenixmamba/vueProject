import { defineStore } from 'pinia'

export const useCountNumStore = defineStore('countNum', {
  //state相当于组件中的data，用来存储状态数据
  state: () => {
    return { sum: 12 }
  },
})
