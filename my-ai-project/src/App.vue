<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from './layout/MainLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout
  }
});
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: auto; /* 改为auto而不是hidden */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-size: 14px;
  background-color: #f8f9fa;
}

/* 重置 Element Plus 菜单样式 */
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 3px solid transparent;
  color: #909399;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: #42b983;
  border-bottom: 3px solid #42b983;
}
</style>