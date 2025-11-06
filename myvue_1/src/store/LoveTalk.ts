import { defineStore } from 'pinia'

export const useLoveTalkStore = defineStore('loveTalk', {
  //state相当于组件中的data，用来存储状态数据
  state: () => {
    return {
      talkList: [
        {
          id: '1',
          text: '你是我的小呀小苹果，怎么爱你都不嫌多。',
        },
        {
          id: '2',
          text: '我想和你一起慢慢变老，直到白发苍苍。',
        },
        {
          id: '3',
          text: '遇见你，是我今生最美的意外。',
        },
      ],
    }
  },
  actions: {
    addTalk() {
      const nextId = (this.talkList.length % 3) + 1
      const nextText =
        nextId === 1
          ? '你是我的小呀小苹果，怎么爱你都不嫌多。'
          : nextId === 2
            ? '我想和你一起慢慢变老，直到白发苍苍。'
            : '遇见你，是我今生最美的意外。'
      this.talkList.push({
        id: String(nextId),
        text: nextText,
      })
    },
  },
})
