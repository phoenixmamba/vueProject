<script setup lang="ts">
import { ref } from 'vue'
import { useLoveTalkStore } from '../store/LoveTalk'
const loveTalkStore = useLoveTalkStore()
// const talkList = ref([
//   {
//     id: '1',
//     text: '你是我的小呀小苹果，怎么爱你都不嫌多。',
//   },
//   {
//     id: '2',
//     text: '我想和你一起慢慢变老，直到白发苍苍。',
//   },
//   {
//     id: '3',
//     text: '遇见你，是我今生最美的意外。',
//   },
// ])
function getNextTalk() {
  // // 模拟获取下一句情话
  // const nextId = (loveTalkStore.talkList.length % 3) + 1
  // const nextText =
  //   nextId === 1
  //     ? '你是我的小呀小苹果，怎么爱你都不嫌多。'
  //     : nextId === 2
  //       ? '我想和你一起慢慢变老，直到白发苍苍。'
  //       : '遇见你，是我今生最美的意外。'
  // loveTalkStore.talkList.push({ id: String(nextId), text: nextText })
  loveTalkStore.addTalk()
}
</script>

<template>
  <div class="love-talk">
    <button @click="getNextTalk">点击获取下一句</button>
    <ul>
      <li v-for="item in loveTalkStore.talkList" :key="item.id">{{ item.text }}</li>
    </ul>
  </div>
</template>

<style scoped>
button {
  margin-bottom: 12px;
  padding: 6px 8px;
}
ul {
  padding: 0;
}
li {
  margin-bottom: 8px;
  padding: 8px;
  background-color: #f0f0f0;
}
.love-talk {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff0fe;
}
</style>
