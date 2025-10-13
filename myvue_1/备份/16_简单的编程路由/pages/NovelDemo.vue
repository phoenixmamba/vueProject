<template>
  <div class="novel-demo">
    <h2>AI 小说生成</h2>
    <input
      v-model="desc"
      :disabled="loading"
      placeholder="请输入小说描述，如：科幻、爱情、悬疑等..."
      style="width: 100%; margin-bottom: 12px; padding: 6px 8px; font-size: 15px"
      maxlength="200"
    />
    <textarea
      v-model="novelText"
      rows="16"
      style="width: 100%; margin-bottom: 12px"
      readonly
    ></textarea>
    <div>
      <button @click="fetchNovel" :disabled="loading || !desc.trim()">生成小说</button>
      <span v-if="loading" style="margin-left: 12px">正在生成...</span>
    </div>
    <div v-if="errorMsg" style="color: red; margin-top: 8px">{{ errorMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const desc = ref('')
const novelText = ref('')
const errorMsg = ref('')
const loading = ref(false)
let controller: AbortController | null = null

async function fetchNovel() {
  if (loading.value) return
  novelText.value = ''
  errorMsg.value = ''
  loading.value = true
  controller = new AbortController()
  try {
    const response = await fetch('http://localhost:8001/ai-meeting/api/novel/generateSimpleNovel', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'text/plain',
      },
      body: desc.value,
    })
    if (!response.body) throw new Error('无响应流')
    const reader = response.body.getReader()
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      const chunk = new TextDecoder().decode(value)
      // 逐行处理SSE文本
      chunk.split('\n').forEach((line) => {
        if (line.startsWith('data:')) {
          const text = line.replace('data:', '').trim()
          if (text) novelText.value += text
        }
      })
    }
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
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.novel-demo {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 24px;
  margin: 20px auto;
  max-width: 600px;
  box-shadow: 0 2px 8px #0001;
}
textarea {
  font-size: 15px;
  font-family: 'Consolas', 'Menlo', 'monospace';
  resize: vertical;
}
button {
  margin-right: 10px;
}
</style>
