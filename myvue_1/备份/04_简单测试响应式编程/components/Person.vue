<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" name="Person234" setup>
let name = '账单'
let age = 18
const tel = '13776407246'
function changeName() {
  name = '李素'
  console.log(name)
}
function changeAge() {
  age = age + 1
}
function showTel() {
  alert(tel)
}
</script>

<template>
  <div class="person">
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

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
</style>
