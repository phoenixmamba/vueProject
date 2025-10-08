<template>
  <nav style="margin-bottom: 20px">
    <Person a="haha" :list="personList" />
    <!-- <button @click="goTo('/')">Person组件</button>
    <button @click="goTo('/sse')">SSE流式推送</button>
    <button @click="goTo('/paged-order')">分页拉取订单</button> -->
    <!-- <button @click="goTo('/novel')">AI小说生成</button> -->
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Person from './components/Person.vue'
import { type Persons } from '@/types/index'
const router = useRouter()
function goTo(path: string) {
  router.push(path)
}
const personList = ref<Persons>([
  { id: '1', name: '张三', age: 20 },
  { id: '2', name: '李四', age: 30 },
  { id: '3', name: '王五', age: 40 },
])
console.log('App setup')
onBeforeMount(() => {
  console.log('App onBeforeMount')
})
onMounted(() => {
  console.log('App onMounted')
})
</script>

<style>
/* .app {
  background-color: brown;
  box-shadow: 0 0 10px;
  padding: 20px;
  border-radius: 10px;
} */
</style>
