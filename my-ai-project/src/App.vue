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
  overflow: hidden;
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
</style>