<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 模拟新闻数据
const newsList = ref([
  {
    id: '1',
    title: 'Vue 3.0 发布 - 全新的 Composition API',
    date: '2025-10-09',
    author: '张三',
    content: `
      <p>Vue 3.0 正式发布了！这是一个重要的里程碑版本，带来了许多令人兴奋的新特性和改进。</p>

      <p>Composition API 是 Vue 3.0 最重要的新增功能之一。它提供了一种更灵活的方式来组织和重用组件逻辑，解决了 Options API 在大型项目中的一些局限性。</p>

      <p>性能方面，Vue 3.0 通过重写核心实现了显著提升。初次渲染速度提高了约 100%，内存使用减少了约 50%。这对于移动端和性能敏感的应用来说是一个重大改进。</p>

      <p>Tree-shaking 支持使得最终打包的体积更小。不使用的功能会被自动移除，基础版本的大小只有不到 10KB。</p>

      <p>Fragment、Teleport 和 Suspense 是 Vue 3.0 引入的三个新特性。Fragment 允许组件返回多个根节点，Teleport 可以将组件渲染到 DOM 的任何位置，Suspense 则提供了更好的异步组件处理方案。</p>

      <p>TypeScript 支持也得到了增强，Vue 3.0 本身就是用 TypeScript 编写的，提供了更好的类型推导和开发体验。</p>
    `,
  },
  {
    id: '2',
    title: 'React 18 新特性详解',
    date: '2025-10-08',
    author: '李四',
    content: `
      <p>React 18 带来了自动批处理、新的 root API、Suspense SSR 支持等重要更新。</p>

      <p>自动批处理是 React 18 中最实用的功能之一，默认情况下会批量处理多个状态更新，从而减少不必要的重新渲染，提高应用程序性能。</p>

      <p>新的 Root API 使 React 更容易与其它框架集成，并为未来的功能做好准备。createRoot API 替代了之前的 ReactDOM.render 方法。</p>

      <p>并发渲染是 React 18 的核心特性，允许 React 同时准备多个版本的 UI，在后台渲染更新而不会阻塞主线程。</p>
    `,
  },
  {
    id: '3',
    title: 'Angular 15 重大更新',
    date: '2025-10-07',
    author: '王五',
    content: `
      <p>Angular 15 引入了许多激动人心的新功能，包括 Standalone Components、新的 HttpClient 和改进的开发者工具。</p>

      <p>Standalone Components 是 Angular 15 最重要的特性之一，它简化了组件声明和导入的方式，减少了对 NgModule 的依赖。</p>

      <p>新的 HttpClient 提供了更好的类型安全和错误处理机制，使 HTTP 请求更加可靠和易于维护。</p>

      <p>Angular 15 还增强了对 RxJS v7 的支持，提供了更好的性能和更丰富的操作符。</p>
    `,
  },
])

// 根据路由参数获取当前新闻
const currentNews = computed(() => {
  const id = route.query.id
  return newsList.value.find((news) => news.id === id) || newsList.value[0]
})
</script>

<template>
  <div class="news-detail">
    <div class="news-header">
      <h1 class="news-title">{{ currentNews.title }}</h1>
      <div class="news-meta">
        <span class="news-date">{{ currentNews.date }}</span>
        <span class="news-author">作者: {{ currentNews.author }}</span>
      </div>
    </div>
    <div class="news-content" v-html="currentNews.content"></div>
  </div>
</template>

<style scoped>
.news-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  border-left: 1px solid #eee;
  min-height: 400px;
}

.news-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.news-title {
  font-size: 28px;
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-weight: bold;
}

.news-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #7f8c8d;
}

.news-content {
  font-size: 16px;
}

.news-content p {
  margin: 15px 0;
  text-align: justify;
}

.news-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
}
</style>
