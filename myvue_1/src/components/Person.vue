<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="person">
    <h1>情况一：监视ref定义的基本类型数据</h1>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<script lang="ts" name="Person234" setup>
import { ref, watch } from 'vue'
const sum = ref(0)
function changeSum() {
  sum.value += 1
}
watch(sum, (newV, oldV) => {
  console.log('sum变化了', newV, oldV)
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
li {
  margin: 4px 0;
  font-size: 20px;
}
</style>
