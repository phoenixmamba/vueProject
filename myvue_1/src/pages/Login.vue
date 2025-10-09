<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login">
    <h2>用户登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名:</label>
        <input 
          id="username" 
          v-model="loginForm.username" 
          type="text" 
          placeholder="请输入用户名" 
          required
        >
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input 
          id="password" 
          v-model="loginForm.password" 
          type="password" 
          placeholder="请输入密码" 
          required
        >
      </div>
      <div class="form-actions">
        <button type="submit">登录</button>
        <button type="button" @click="handleReset">重置</button>
      </div>
    </form>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 错误消息
const errorMessage = ref('')

// 处理登录
const handleLogin = () => {
  // 简单验证
  if (!loginForm.username || !loginForm.password) {
    errorMessage.value = '用户名和密码不能为空'
    return
  }

  // 模拟登录过程（实际项目中应调用后端API）
  if (loginForm.username === 'admin' && loginForm.password === '123456') {
    // 登录成功，保存用户状态和登录时间
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', loginForm.username)
    localStorage.setItem('loginTime', Date.now().toString())
    
    // 跳转到首页或者用户原本想要访问的页面
    router.push('/')
  } else {
    errorMessage.value = '用户名或密码错误'
  }
}

// 重置表单
const handleReset = () => {
  loginForm.username = ''
  loginForm.password = ''
  errorMessage.value = ''
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
}

h2 {
  color: #1f2d3d;
  margin-bottom: 25px;
  font-size: 1.8em;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #5a67d8;
  box-shadow: 0 0 0 2px rgba(90, 103, 216, 0.2);
}

.form-actions {
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #5a67d8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #3b47a0;
}

button[type="button"] {
  background-color: #e2e8f0;
  color: #333;
}

button[type="button"]:hover {
  background-color: #cbd5e0;
}

.error-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #fed7d7;
  color: #c53030;
  border-radius: 4px;
}
</style>