<template>
  <div class="app">
    <MyHeader />
    <div class="navigate">
      <RouterLink :to="{ name: 'home' }">首页</RouterLink>
      <RouterLink :to="{ name: 'news' }">新闻</RouterLink>
  <RouterLink :to="{ name: 'guanyu' }">关于</RouterLink>
  <RouterLink :to="{ name: 'dog' }">狗狗</RouterLink>
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import MyHeader from './components/MyHeader.vue'
</script>

<style>
body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  background-color: #f0f2f5;
  color: #333;
}

.app {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
}

h2 {
  color: #1f2d3d;
  margin-bottom: 25px;
  font-size: 2em;
}

.navigate {
  background-color: #eaf2f8;
  padding: 15px 0;
  border-radius: 8px;
  margin-bottom: 30px;
}

.navigate a {
  color: #5a67d8;
  text-decoration: none;
  margin: 0 20px;
  font-size: 1.1em;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navigate a:hover {
  color: #3b47a0;
}

.navigate a.router-link-active {
  color: #3b47a0;
  font-weight: bold;
}

.content {
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.content h3 {
  color: #2d3748;
  font-size: 1.5em;
  margin-bottom: 15px;
}

.content p {
  line-height: 1.7;
  font-size: 1.1em;
  color: #4a5568;
}
</style>
