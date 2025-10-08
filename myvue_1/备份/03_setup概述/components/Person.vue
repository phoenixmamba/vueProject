<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
export default {
  name: 'Person', //组件名
  // data() {
  //   return {
  //     name: '张飒',
  //     age: 10,
  //     tel: '12776407246',
  //   }
  // },
  // methods: {
  //   showTel() {
  //     alert(this.tel)
  //   },
  //   changeName() {
  //     this.name = '李四'
  //   },
  //   changeAge() {
  //     this.age = this.age + 1
  //   },
  // },
  setup() {
    console.log('AAA')
    //数据
    //注意此时的name不是响应式的，下方的参数同理
    let name = '账单'
    let age = 18
    const tel = '13776407246'

    //方法
    function changeName() {
      name = '李素'
      console.log(name)
    }
    function changeAge() {
      age = age + 1
    }
    function showTel() {
      alert(tel)
    }
    return { name, age, tel, changeName, changeAge, showTel }
  },
}
</script>

<template>
  <div class="person">
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  padding: 20px;
  border-radius: 10px;
}
button {
  margin: 0 10px;
}
</style>
