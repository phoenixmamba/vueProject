<template>
  <div class="dog-page">
    <h1>随机狗狗图片</h1>
    <button @click="fetchDog">再来一张</button>
    <div v-if="img">
      <img :src="img" alt="dog" style="max-width: 100%; margin-top: 16px;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const img = ref('')

async function fetchDog() {
  try {
    // 请求 /api/breeds/image/random 将被 dev server proxy 转发到 https://dog.ceo/api/breeds/image/random
    const res = await axios.get('/api/breeds/image/random')
    img.value = res.data.message
  } catch (err) {
    // 简单错误处理
    console.error(err)
    alert('请求失败，请查看控制台')
  }
}
</script>

<style scoped>
.dog-page {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}
</style>
