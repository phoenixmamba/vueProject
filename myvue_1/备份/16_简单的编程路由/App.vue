<template>
  <div class="app">
    <MyHeader />
    <nav class="navigate">
      <!-- 使用语义化nav标签 -->
      <RouterLink :to="{ name: 'news' }">新闻</RouterLink>
      <RouterLink :to="{ name: 'guanyu' }">关于</RouterLink>
      <RouterLink :to="{ name: 'dog' }">狗狗</RouterLink>
      <RouterLink :to="{ name: 'novel' }">小说</RouterLink>
      <!-- 修正重复的"狗狗"文本 -->
    </nav>
    <main class="content">
      <!-- 使用语义化main标签 -->
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import MyHeader from './components/MyHeader.vue'
</script>

<style scoped>
/* 添加scoped隔离样式 */
body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  background-color: #f0f2f5;
  color: #333;
}

.app {
  max-width: 1200px; /* 扩大最大宽度适应更多内容 */
  margin: 30px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

h2 {
  color: #1f2d3d;
  margin-bottom: 25px;
  font-size: 2em;
  text-align: center; /* 标题居中单独设置 */
}

.navigate {
  background-color: #eaf2f8;
  padding: 15px 0;
  border-radius: 8px;
  margin: 0 0 30px;
  display: flex; /* 使用flex布局更灵活 */
  justify-content: center;
  gap: 30px; /* 均匀间距 */
}

.navigate a {
  color: #5a67d8;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: 500;
  transition: all 0.3s ease; /* 统一过渡效果 */
  padding: 5px 10px;
  border-radius: 4px;
}

.navigate a:hover {
  color: #3b47a0;
  background-color: rgba(90, 103, 216, 0.1); /* 增加hover背景 */
}

.navigate a.router-link-active {
  color: #3b47a0;
  font-weight: bold;
  border-bottom: 2px solid #3b47a0; /* 增加激活状态下划线 */
}

.content {
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  min-height: 400px; /* 确保内容区有最低高度 */
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
