<template>
  <div class="mcp-debug">
    <h1>MCP调试工具</h1>
    <p>根据MCP测试API文档提供的接口进行调试</p>
    
    <el-tabs v-model="activeTab" class="demo-tabs">
      <!-- 查询用户信息 -->
      <el-tab-pane label="查询用户信息" name="queryUser">
        <el-card class="debug-card">
          <!-- <h3>POST /api/mcp-test/query-user</h3> -->
          <el-form :model="queryUserForm" label-width="100px">
            <el-form-item label="用户ID">
              <el-input v-model="queryUserForm.userId" placeholder="请输入用户ID" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryUser" :loading="queryUserLoading">
                发送请求
              </el-button>
              <el-button @click="clearQueryUserResult">清空结果</el-button>
            </el-form-item>
          </el-form>
          
          <div class="result-section" v-if="queryUserResult">
            <h4>响应结果:</h4>
            <el-input 
              type="textarea" 
              v-model="queryUserResult" 
              :rows="10" 
              readonly 
              class="result-textarea"
            />
          </div>
        </el-card>
      </el-tab-pane>
      
      <!-- 查询产品列表 -->
      <el-tab-pane label="查询产品列表" name="queryProducts">
        <el-card class="debug-card">
          <!-- <h3>POST /api/mcp-test/query-products</h3> -->
          <el-button type="primary" @click="queryProducts" :loading="queryProductsLoading">
            发送请求
          </el-button>
          <el-button @click="clearQueryProductsResult">清空结果</el-button>
          
          <div class="result-section" v-if="queryProductsResult">
            <h4>响应结果:</h4>
            <el-input 
              type="textarea" 
              v-model="queryProductsResult" 
              :rows="10" 
              readonly 
              class="result-textarea"
            />
          </div>
        </el-card>
      </el-tab-pane>
      
      <!-- 自定义查询 -->
      <el-tab-pane label="自定义查询" name="customQuery">
        <el-card class="debug-card">
          <!-- <h3>POST /api/mcp-test/custom-query</h3> -->
          <el-form :model="customQueryForm" label-width="100px">
            <el-form-item label="查询类型">
              <el-input v-model="customQueryForm.queryType" placeholder="请输入查询类型" />
            </el-form-item>
            <el-form-item label="查询参数">
              <el-input v-model="customQueryForm.queryParam" placeholder="请输入查询参数" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="customQuery" :loading="customQueryLoading">
                发送请求
              </el-button>
              <el-button @click="clearCustomQueryResult">清空结果</el-button>
            </el-form-item>
          </el-form>
          
          <div class="result-section" v-if="customQueryResult">
            <h4>响应结果:</h4>
            <el-input 
              type="textarea" 
              v-model="customQueryResult" 
              :rows="10" 
              readonly 
              class="result-textarea"
            />
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'McpDebugView'
})

// 当前激活的标签页
const activeTab = ref('queryUser')

// 查询用户信息相关
const queryUserForm = reactive({
  userId: ''
})

const queryUserResult = ref('')
const queryUserLoading = ref(false)

// 查询产品列表相关
const queryProductsResult = ref('')
const queryProductsLoading = ref(false)

// 自定义查询相关
const customQueryForm = reactive({
  queryType: '',
  queryParam: ''
})

const customQueryResult = ref('')
const customQueryLoading = ref(false)

// 查询用户信息
const queryUser = async () => {
  if (!queryUserForm.userId) {
    ElMessage.warning('请输入用户ID')
    return
  }

  queryUserLoading.value = true
  queryUserResult.value = ''
  
  try {
    const response = await fetch('http://localhost:8001/ai-meeting/api/mcp-test/query-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        userId: queryUserForm.userId
      })
    })

    if (!response.body) {
      throw new Error('响应体为空')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let result = ''
    let done = false

    while (!done) {
      const { done: readerDone, value } = await reader.read()
      done = readerDone
      
      if (!done && value) {
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        queryUserResult.value = result
      }
    }
  } catch (error) {
    console.error('查询用户信息失败:', error)
    ElMessage.error('查询用户信息失败: ' + (error instanceof Error ? error.message : '未知错误'))
  } finally {
    queryUserLoading.value = false
  }
}

// 清空查询用户结果
const clearQueryUserResult = () => {
  queryUserResult.value = ''
}

// 查询产品列表
const queryProducts = async () => {
  queryProductsLoading.value = true
  queryProductsResult.value = ''
  
  try {
    const response = await fetch('http://localhost:8001/ai-meeting/api/mcp-test/query-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (!response.body) {
      throw new Error('响应体为空')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let result = ''
    let done = false

    while (!done) {
      const { done: readerDone, value } = await reader.read()
      done = readerDone
      
      if (!done && value) {
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        queryProductsResult.value = result
      }
    }
  } catch (error) {
    console.error('查询产品列表失败:', error)
    ElMessage.error('查询产品列表失败: ' + (error instanceof Error ? error.message : '未知错误'))
  } finally {
    queryProductsLoading.value = false
  }
}

// 清空查询产品结果
const clearQueryProductsResult = () => {
  queryProductsResult.value = ''
}

// 自定义查询
const customQuery = async () => {
  if (!customQueryForm.queryType) {
    ElMessage.warning('请输入查询类型')
    return
  }
  
  if (!customQueryForm.queryParam) {
    ElMessage.warning('请输入查询参数')
    return
  }

  customQueryLoading.value = true
  customQueryResult.value = ''
  
  try {
    const response = await fetch('http://localhost:8001/ai-meeting/api/mcp-test/custom-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        queryType: customQueryForm.queryType,
        queryParam: customQueryForm.queryParam
      })
    })

    if (!response.body) {
      throw new Error('响应体为空')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let result = ''
    let done = false

    while (!done) {
      const { done: readerDone, value } = await reader.read()
      done = readerDone
      
      if (!done && value) {
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        customQueryResult.value = result
      }
    }
  } catch (error) {
    console.error('自定义查询失败:', error)
    ElMessage.error('自定义查询失败: ' + (error instanceof Error ? error.message : '未知错误'))
  } finally {
    customQueryLoading.value = false
  }
}

// 清空自定义查询结果
const clearCustomQueryResult = () => {
  customQueryResult.value = ''
}
</script>

<style scoped>
.mcp-debug {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.mcp-debug h1 {
  text-align: center;
  margin-bottom: 10px;
}

.mcp-debug p {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.debug-card {
  margin-bottom: 20px;
}

.result-section {
  margin-top: 20px;
}

.result-textarea {
  width: 100%;
}

.demo-tabs {
  margin-top: 20px;
}

.el-form {
  max-width: 500px;
}
</style>