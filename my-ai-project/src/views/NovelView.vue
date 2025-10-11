<template>
  <div class="novel-demo">
    <div class="header-section">
      <h2>AI 小说生成器</h2>
      <p>输入关键词或类型，让AI为你创作独特的小说</p>
    </div>
    
    <div class="input-section">
      <el-input
        v-model="desc"
        :disabled="loading"
        placeholder="请输入小说描述，如：科幻、爱情、悬疑等..."
        size="large"
        clearable
      >
        <template #append>
          <el-button 
            @click="fetchNovel" 
            :loading="loading" 
            :disabled="!desc.trim()"
            type="primary"
          >
            {{ loading ? '生成中...' : '生成小说' }}
          </el-button>
        </template>
      </el-input>
    </div>
    
    <div class="result-section">
      <div v-if="novelText" class="novel-content">
        <div class="novel-header">
          <h3>生成结果</h3>
          <div class="button-group">
            <el-button 
              @click="copyToClipboard" 
              size="small" 
              type="primary" 
              plain
            >
              复制内容
            </el-button>
            <el-button 
              @click="openFolder" 
              size="small" 
              type="success" 
              plain
            >
              打开文件夹
            </el-button>
          </div>
        </div>
        <el-card class="novel-text-card">
          <div class="novel-text">{{ novelText }}</div>
        </el-card>
      </div>
      
      <div v-else class="empty-state">
        <i class="empty-icon">📖</i>
        <p>输入小说类型并点击"生成小说"按钮开始创作</p>
      </div>
    </div>
    
    <div v-if="errorMsg" class="error-message">
      <el-alert
        :title="errorMsg"
        type="error"
        show-icon
        closable
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

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
    while (true) { // eslint-disable-line no-constant-condition
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

const copyToClipboard = () => {
  navigator.clipboard.writeText(novelText.value).then(() => {
    ElMessage.success('内容已复制到剪贴板')
  }).catch(() => {
    ElMessage.error('复制失败')
  })
}

const openFolder = () => {
  const folderPath = 'D:\\\\develop\\\\workspace\\\\MyGithub\\\\AIProject\\\\ai-meeting\\\\tmp\\\\simple_output\\\\simpleTxt'
  // 创建一个隐藏的链接元素来触发文件夹打开操作
  const link = document.createElement('a')
  link.href = 'file:///' + folderPath
  link.target = '_blank'
  link.click()
}
</script>

<style scoped>
.novel-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 30px;
}

.header-section h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.header-section p {
  font-size: 1.1rem;
  color: #666;
}

.input-section {
  margin-bottom: 30px;
}

.result-section {
  margin-bottom: 20px;
}

.novel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.novel-header h3 {
  margin: 0;
  color: #333;
}

.button-group {
  display: flex;
  gap: 10px;
}

.novel-text-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.novel-text {
  white-space: pre-wrap;
  font-family: 'Consolas', 'Menlo', 'monospace';
  line-height: 1.6;
  color: #333;
  font-size: 15px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #dcdfe6;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 15px;
}

.error-message {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .novel-demo {
    padding: 10px;
  }
  
  .header-section h2 {
    font-size: 1.5rem;
  }
  
  .novel-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .button-group {
    width: 100%;
    justify-content: center;
  }
}
</style>