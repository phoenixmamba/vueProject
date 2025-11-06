<script setup lang="ts">
import { ref } from 'vue'
import { useCountNumStore, useCountNumStore2 } from '../store/CountNum'
import { storeToRefs } from 'pinia'
const countStore = useCountNumStore()
const countStore2 = useCountNumStore2()

const { sum, bigSum } = storeToRefs(countStore)
console.log('====', sum)
const n = ref(1)
countStore.$subscribe((mutation, state) => {
  console.log('countStore changed:', mutation, state)
  localStorage.setItem('sum', JSON.stringify(state.sum))
})
function min() {
  sum.value -= n.value
}
function add() {
  // //第一种变更状态的方式
  // countStore.sum += n.value
  //第二种变更状态的方式
  // countStore.$patch((state) => {
  //   state.sum += n.value
  // })
  //第三种变更状态的方式
  countStore.addNum(n.value)
}
</script>

<template>
  <div class="container">
    <h2>当前求和为：{{ countStore.sum }},放大十倍：{{ bigSum }}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="min">减</button>
  </div>
</template>

<style scoped>
h2 {
  color: #333;
}

select,
button {
  margin: 0 15px;
  padding: 5px 20px;
}

.container {
  background-color: rgb(123, 255, 0);
  padding: 20px;
  text-align: center;
}
</style>
