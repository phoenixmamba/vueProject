<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" name="Person234" setup>
import { reactive } from 'vue'
const car = reactive({ brand: 'BMW', price: 500000 })
function changePrie() {
  car.price += 10000
}
const games = reactive([
  { id: 1, name: '王者荣耀' },
  { id: 2, name: '和平精英' },
  { id: 3, name: '英雄联盟' },
])
function changeFirstGameName() {
  games[0].name += '（已更新）'
}
</script>

<template>
  <div class="person">
    <h2>汽车信息</h2>
    <p>品牌：{{ car.brand }}</p>
    <p>价格：{{ car.price }}</p>
    <button @click="changePrie">涨价</button>
    <h2>游戏列表</h2>
    <ul>
      <li v-for="game in games" :key="game.id">{{ game.name }}</li>
    </ul>
    <button @click="changeFirstGameName">修改第一个游戏名称</button>
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
li {
  margin: 4px 0;
  font-size: 20px;
}
</style>
