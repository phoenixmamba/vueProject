<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="person">
    <h2>sum:{{ sum }}</h2>
    <button @click="add">点击+1</button>
  </div>
</template>

<script lang="ts" name="Person234" setup>
// import { defineProps, withDefaults } from 'vue'
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from 'vue'

const sum = ref(0)

function add() {
  sum.value++
}
console.log('Person setup')
onBeforeMount(() => {
  console.log('Person onBeforeMount')
})
onMounted(() => {
  console.log('Person onMounted')
})
onBeforeUpdate(() => {
  console.log('Person onBeforeUpdate')
})
onUpdated(() => {
  console.log('Person onUpdated')
})
</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  padding: 20px;
  border-radius: 10px;
}
button {
  margin: 0 10px;
}
ul {
  background-color: burlywood;
  list-style: none;
  padding: 0;
}
li {
  background: #f8f6f6;
  margin-bottom: 8px;
  padding: 10px 16px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  font-size: 16px;
  color: #333;
}
</style>
