<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="person">
    <h2>sum:{{ sum }},放大十倍：{{ bigSum }}</h2>
    <button @click="add">点击+1</button>
    <hr />
    <ul>
      <li v-for="(dog, index) in dogList" :key="index">
        <img :src="dog" alt="dog" width="200" />
      </li>
    </ul>
    <button @click="anotherDog">再来一只狗</button>
  </div>
</template>

<script lang="ts" name="Person234" setup>
// import { defineProps, withDefaults } from 'vue'
import useDog from '@/hooks/useDog'
import useSum from '@/hooks/useSum'

const { sum, add, bigSum } = useSum()
const { dogList, anotherDog } = useDog()
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
img {
  height: auto;
}
</style>
