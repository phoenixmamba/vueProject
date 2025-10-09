<template>
  <div class="header">
    <h2 class="title">路由测试</h2>
    <div v-if="isLoggedIn" class="logout-section">
      <span class="welcome">欢迎, {{ username }}!</span>
      <button @click="handleLogout" class="logout-btn">注销</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const username = ref('')

// 检查用户登录状态
const checkLoginStatus = () => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  username.value = localStorage.getItem('username') || ''
}

// 处理注销
const handleLogout = () => {
  // 清除登录状态
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('username')
  localStorage.removeItem('loginTime')
  
  // 更新状态
  isLoggedIn.value = false
  username.value = ''
  
  // 跳转到登录页面
  router.push('/login')
}

// 组件挂载时检查登录状态
onMounted(() => {
  checkLoginStatus()
})

// 监听路由变化，更新登录状态
router.afterEach(() => {
  checkLoginStatus()
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  color: #1f2d3d;
  margin-bottom: 25px;
  font-size: 2em;
  text-align: center;
  flex-grow: 1;
}

.logout-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.welcome {
  font-size: 1rem;
  color: #333;
}

.logout-btn {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>