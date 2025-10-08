<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="news">
    <h1>新闻列表</h1>
    <ul>
      <li v-for="item in newsList" :key="item.id">
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
        <small>{{ item.date }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="myNews">
import { ref } from 'vue'

const newsList = ref([
  {
    id: 1,
    title: 'Vue 3 发布',
    content: 'Vue 3 已经正式发布，带来了许多新特性。',
    date: '2024-06-01',
  },
  {
    id: 2,
    title: '前端技术趋势',
    content: '前端技术日新月异，持续关注最新动态。',
    date: '2024-06-02',
  },
])
</script>

<style scoped>
.news {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
.news h1 {
  text-align: center;
}
.news ul {
  list-style: none;
  padding: 0;
}
.news li {
  border-bottom: 1px solid #eee;
  padding: 16px 0;
}
.news h2 {
  margin: 0 0 8px;
  font-size: 20px;
}
.news p {
  margin: 0 0 4px;
}
.news small {
  color: #888;
}
</style>
