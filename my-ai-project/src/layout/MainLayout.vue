<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <h2>AI 工具箱</h2>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="menu"
          @select="handleSelect"
          background-color="#2c3e50"
          text-color="#fff"
          active-text-color="#42b983"
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
        </el-menu>
      </el-aside>
      
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { House, VideoCamera, Edit } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    House,
    VideoCamera,
    Edit
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
  height: 100vh;
}

.el-aside {
  background-color: #2c3e50;
  color: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #4a5d75;
}

.logo h2 {
  margin: 0;
  color: #fff;
}

.menu {
  height: calc(100% - 60px);
  border-right: none;
}

.el-main {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 40px);
}

.el-menu-item:hover {
  background-color: #34495e !important;
}

.el-menu-item.is-active {
  background-color: #34495e !important;
  border-right: 3px solid #42b983;
}
</style>