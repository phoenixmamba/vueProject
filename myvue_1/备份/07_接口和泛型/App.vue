<template>
  <nav style="margin-bottom: 20px">
    <button @click="goTo('/')">Person组件</button>
    <button @click="goTo('/sse')">SSE流式推送</button>
    <button @click="goTo('/paged-order')">分页拉取订单</button>
    <!-- <button @click="goTo('/novel')">AI小说生成</button> -->
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function goTo(path: string) {
  router.push(path)
}
</script>

<style>
/* .app {
  background-color: brown;
  box-shadow: 0 0 10px;
  padding: 20px;
  border-radius: 10px;
} */
</style>
