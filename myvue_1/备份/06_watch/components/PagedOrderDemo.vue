<template>
  <div class="paged-demo">
    <h2>自动分页拉取订单</h2>
    <div style="margin-bottom: 12px">
      <button @click="startPagedFetch" :disabled="loading">开始分页拉取</button>
      <button @click="stopPagedFetch" :disabled="!loading">停止</button>
      <span v-if="loading" style="margin-left: 12px">当前页: {{ pageIndex + 1 }}</span>
    </div>
    <table border="1" cellpadding="6" style="background: white; min-width: 300px">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>分数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.score }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="errorMsg" style="color: red">{{ errorMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

interface CusOrder {
  id: number
  score: number
  name: string
}

const orders = ref<CusOrder[]>([])
const errorMsg = ref('')
const loading = ref(false)
const pageIndex = ref(0)
const pageSize = 50
const maxLimit = 1000
let controller: AbortController | null = null

async function fetchPage(offset: number, pageSize: number) {
  try {
    const url = `http://localhost:9001/springboot3/api/flux/pagedData?offset=${offset}&pageSize=${pageSize}&maxLimit=${maxLimit}`
    controller = new AbortController()
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'text/event-stream' },
    })
    if (!response.body) throw new Error('无响应流')
    const reader = response.body.getReader()
    let received = 0
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      const chunk = new TextDecoder().decode(value)
      // 解析SSE格式，提取data字段
      chunk.split('\n').forEach((line) => {
        if (line.startsWith('data:')) {
          try {
            const order = JSON.parse(line.replace('data:', '').trim())
            orders.value.push(order)
            received++
          } catch {}
        }
      })
    }
    return received
  } catch (e: unknown) {
    if (
      typeof e === 'object' &&
      e !== null &&
      'name' in e &&
      (e as { name?: string }).name === 'AbortError'
    ) {
      // 忽略 AbortError
    } else if (
      typeof e === 'object' &&
      e !== null &&
      'message' in e &&
      typeof (e as { message?: unknown }).message === 'string'
    ) {
      errorMsg.value = (e as { message: string }).message
    } else {
      errorMsg.value = '请求异常'
    }
    return 0
  }
}

async function startPagedFetch() {
  if (loading.value) return
  orders.value = []
  errorMsg.value = ''
  loading.value = true
  pageIndex.value = 0
  let offset = 0
  while (loading.value && offset < maxLimit) {
    const received = await fetchPage(offset, pageSize)
    if (received === 0) break
    offset += received
    pageIndex.value++
  }
  loading.value = false
}

function stopPagedFetch() {
  loading.value = false
  if (controller) controller.abort()
}

onBeforeUnmount(() => {
  stopPagedFetch()
})
</script>

<style scoped>
.paged-demo {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 24px;
  margin: 20px auto;
  max-width: 500px;
  box-shadow: 0 2px 8px #0001;
}
button {
  margin-right: 10px;
}
</style>
