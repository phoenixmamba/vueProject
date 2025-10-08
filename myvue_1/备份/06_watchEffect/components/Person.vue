<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="person">
    <h2>水温：{{ temp }}</h2>
    <h2>水位：{{ height }}</h2>
    <button @click="changeTemp">点我水温+10</button>
    <button @click="changeHeight">点我水位+10</button>
    <hr />
  </div>
</template>

<script lang="ts" name="Person234" setup>
import { ref, watch, watchEffect } from 'vue'

const temp = ref(10)
const height = ref(0)

function changeTemp() {
  temp.value += 10
}

function changeHeight() {
  height.value += 10
}

// const stopWatch = watch([temp, height], ([newTemp, newHeight]) => {
//   console.log('水温或水位变化了', newTemp, newHeight)
//   if (newTemp > 50 || newHeight > 50) {
//     console.log('水温或水位过高，停止监视')
//     stopWatch()
//   }
// })
watchEffect(() => {
  if (temp.value) {
    console.log('temp', temp.value)
  }
  // console.log('watchEffect=>水温或水位变化了', temp.value, height.value)
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
