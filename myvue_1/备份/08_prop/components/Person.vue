<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="person">
    <h2>{{ a }}</h2>
    <ul>
      <li v-for="per in list" :key="per.id">{{ per.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" name="Person234" setup>
// import { defineProps, withDefaults } from 'vue'
import { type Persons } from '@/types/index'

//接受加限制类型
// defineProps<{ list?: Persons; a: string }>()
withDefaults(defineProps<{ list?: Persons; a: string }>(), {
  list: () => [{ id: '1', name: '张三', age: 20 }],
  a: '默认值',
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
