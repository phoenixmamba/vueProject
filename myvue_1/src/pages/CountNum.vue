<script setup lang="ts">
import { ref } from 'vue'
const sum = ref(0)
const n = ref(1)
function min() {
  sum.value -= n.value
}
function add() {
  sum.value += n.value
}
</script>

<template>
  <div class="container">
    <h2>当前求和为：{{ sum }}</h2>
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
