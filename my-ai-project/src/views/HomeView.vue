<template>
  <div class="home">
    <div class="welcome-card">
      <h1>欢迎来到 AI 练习</h1>
      <p>探索人工智能的无限可能</p>
      <div class="features">
        <div class="feature-item">
          <i class="feature-icon">🤖</i>
          <h3>智能会议</h3>
          <p>自动生成会议摘要和要点</p>
        </div>
        <div class="feature-item">
          <i class="feature-icon">📖</i>
          <h3>小说创作</h3>
          <p>AI辅助生成精彩故事</p>
        </div>
        <div class="feature-item">
          <i class="feature-icon">✨</i>
          <h3>更多功能</h3>
          <p>持续更新中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView'
});
</script>

<style scoped>
.home {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
}

.welcome-card h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.welcome-card p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 30px;
}

.feature-item {
  flex: 1;
  min-width: 150px;
  padding: 20px;
  margin: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 15px;
}

.feature-item h3 {
  margin: 10px 0;
  font-size: 1.3rem;
}

.feature-item p {
  font-size: 1rem;
  margin: 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .features {
    flex-direction: column;
  }
  
  .welcome-card {
    padding: 20px;
  }
  
  .welcome-card h1 {
    font-size: 2rem;
  }
}
</style>