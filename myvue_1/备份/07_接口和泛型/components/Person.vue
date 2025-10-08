<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="person">
    <h2>个人信息</h2>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <hr />
    <h2>人员列表</h2>
    <ul>
      <li v-for="p in personList" :key="p.id">姓名：{{ p.name }}，年龄：{{ p.age }}</li>
    </ul>
  </div>
</template>

<script lang="ts" name="Person234" setup>
import { ref } from 'vue'
import { type PersonInter, type Persons } from '@/types/index'
const person = ref<PersonInter>({
  id: '1',
  name: '张三',
  age: 20,
})
const personList = ref<Persons>([
  { id: '1', name: '张三', age: 20 },
  { id: '2', name: '李四', age: 30 },
  { id: '3', name: '王五', age: 40 },
])
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
