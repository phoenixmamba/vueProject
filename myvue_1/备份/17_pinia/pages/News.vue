<template>
  <div class="news-container">
    <div class="news-list">
      <ul>
        <li v-for="item in newsList" :key="item.id">
          <!-- <button @click="shouDetail(item.id)">查看详情</button> -->
          <RouterLink :to="{ name: 'newsDetail', params: { id: item.id } }">
            <p>{{ item.title }}</p>
            <small>{{ item.date }}</small>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="news-content">
      <RouterView />
    </div>
    <!-- <ul>
      <li><a href="#">新闻1</a></li>
      <li><a href="#">新闻2</a></li>
      <li><a href="#">新闻3</a></li>
      <li><a href="#">新闻4</a></li>
    </ul> -->
  </div>
</template>

<script setup lang="ts" name="myNews">
import { ref, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const newsList = ref([
  {
    id: '1',
    title: 'Vue 3.0 发布 - 全新的 Composition API',
    date: '2025-10-09',
  },
  {
    id: '2',
    title: 'React 18 新特性详解',
    date: '2025-10-08',
  },
  {
    id: '3',
    title: 'Angular 15 重大更新',
    date: '2025-10-07',
  },
])
const router = useRouter()
//测试编程路由
onMounted(() => {
  setTimeout(() => {
    router.push({ name: 'newsDetail', params: { id: '2' } })
  }, 3000)
})
function shouDetail(newsId: string) {
  router.push({ name: 'newsDetail', params: { id: newsId } })
}
</script>

<style scoped>
.news-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-family: Arial, sans-serif;
  text-align: left;
}

.news-list {
  width: 250px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  height: fit-content;
}

.news-content {
  flex: 1;
}

.news-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.news-list li {
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
}

.news-list li:last-child {
  border-bottom: none;
}

.news-list li::marker {
  color: #42b983;
}

.news-list p {
  margin: 0 0 4px;
}

.news-list small {
  color: #f56e6e;
}

a {
  text-decoration: none;
  color: #42b983;
}

a:hover {
  color: #36986f;
}
</style>
