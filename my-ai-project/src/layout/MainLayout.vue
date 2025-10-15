<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="logo">
          <h2>AI 练习</h2>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="nav-menu"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/meeting">
            <el-icon><VideoCamera /></el-icon>
            <span>会议</span>
          </el-menu-item>
          <el-menu-item index="/novel">
            <el-icon><Edit /></el-icon>
            <span>小说生成</span>
          </el-menu-item>
          <el-menu-item index="/app/create">
            <el-icon><Plus /></el-icon>
            <span>应用创建</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { House, VideoCamera, Edit, Plus } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    House,
    VideoCamera,
    Edit,
    Plus
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    
    const activeIndex = ref('/');
    
    const handleSelect = (key: string) => {
      router.push(key);
    };
    
    // 监听路由变化
    watch(() => route.path, (newPath) => {
      activeIndex.value = newPath;
    });
    
    return {
      activeIndex,
      handleSelect
    };
  }
});
</script>

<style scoped>
.common-layout {
  height: 100%;
  min-height: 100vh;
}

.el-container {
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
}

.header {
  background-color: #2c3e50;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.logo h2 {
  margin: 0;
  color: #fff;
}

.nav-menu {
  background-color: transparent;
  border: none;
  flex: 1;
  height: 60px;
}

.nav-menu :deep(.el-menu-item) {
  color: #fff;
  height: 60px;
  line-height: 60px;
  border: none;
  font-size: 16px;
}

.nav-menu :deep(.el-menu-item:hover) {
  background-color: #34495e !important;
  color: #42b983 !important;
}

.nav-menu :deep(.el-menu-item.is-active) {
  color: #42b983 !important;
  border-bottom: 3px solid #42b983;
}

.el-main {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 80px);
  flex: 1;
  overflow: auto;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
  
  .logo {
    margin-right: 0;
    margin-bottom: 10px;
    justify-content: center;
  }
  
  .nav-menu {
    height: auto;
  }
  
  .nav-menu :deep(.el-menu-item) {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
  }
}
</style>