<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activeIndex"
          class="menu"
          @select="handleSelect"
        >
          <el-menu-item index="/">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/meeting">
            <span>会议</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      activeIndex: '/'
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    }
  },
  watch: {
    '$route'(to) {
      this.activeIndex = to.path;
    }
  }
}
</script>

<style scoped>
.common-layout {
  height: 100vh;
}

.el-aside {
  background-color: #f5f5f5;
  border-right: 1px solid #e6e6e6;
}

.menu {
  height: 100%;
  border-right: none;
}

.el-main {
  padding: 20px;
  background-color: #ffffff;
}
</style>