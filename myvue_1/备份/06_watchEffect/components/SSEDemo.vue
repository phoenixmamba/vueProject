<template>
  <div class="sse-demo">
    <h2>订单流式推送</h2>
    <div style="margin-bottom: 12px">
      <button @click="startListen" :disabled="listening">开始监听</button>
      <button @click="stopListen" :disabled="!listening">结束监听</button>
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

const listening = ref(false)
let eventSource: EventSource | null = null

function startListen() {
  if (listening.value) return
  orders.value = []
  errorMsg.value = ''
  eventSource = new EventSource('http://localhost:9001/springboot3/api/flux/testFlux1')
  listening.value = true
  eventSource.onmessage = (event) => {
    // console.log('[SSE] onmessage', event)
    try {
      const order = JSON.parse(event.data)
      orders.value.push(order)
    } catch {
      errorMsg.value = '数据解析异常'
    }
  }
  eventSource.addEventListener('end', (event) => {
    console.log('[SSE] end event', event)
    errorMsg.value = '数据推送已结束'
    stopListen()
  })
  eventSource.addEventListener('error', (event) => {
    console.log('readyState', eventSource?.readyState)
    if (eventSource?.readyState === EventSource.CLOSED) {
      errorMsg.value = '连接已关闭'
    } else {
      console.log('[SSE] error event2', event)
      errorMsg.value = '服务端异常或连接中断'
    }
    stopListen()
  })
}

function stopListen() {
  if (eventSource) {
    eventSource.close()
    eventSource = null
  }
  listening.value = false
}

onBeforeUnmount(() => {
  stopListen()
})
</script>

<style scoped>
.sse-demo {
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
ul {
  margin-top: 10px;
}
</style>
