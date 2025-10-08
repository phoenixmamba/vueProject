<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="person">
    姓：<input type="text" v-model="firstName" /> <br />
    名：<input type="text" v-model="lastName" /> <br />
    全名：<span>{{ fullName }}</span>
    <button @click="changeFullName">修改全名</button>
  </div>
</template>

<script lang="ts" name="Person234" setup>
import { ref, computed } from 'vue'
const firstName = ref('zhang')
const lastName = ref('san')
// const fullName = computed(() => {
//   return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
// })
const fullName = computed({
  get() {
    return (
      firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
    )
  },
  set(newValue: string) {
    const names = newValue.split('-')
    if (names.length === 2) {
      firstName.value = names[0]
      lastName.value = names[1]
    }
  },
})
function changeFullName() {
  fullName.value = 'LiSi-李四'
}
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
