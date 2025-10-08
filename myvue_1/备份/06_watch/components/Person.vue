<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="person">
    <h1>情况一：监视ref定义的基本类型数据</h1>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>
    <hr />
    <h1>情况二：监视ref定义的对象类型数据</h1>
    <h2>姓名:{{ Person.name }}</h2>
    <h2>年龄:{{ Person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
    <hr />
    <h1>情况三：监视reactive定义的对象类型数据</h1>
    <h2>姓名:{{ Person2.name }}</h2>
    <h2>年龄:{{ Person2.age }}</h2>
    <button @click="changeName2">修改名字</button>
    <button @click="changeAge2">修改年龄</button>
    <button @click="changePerson2">修改整个人</button>
    <hr />
    <h1>情况四：监视reactive定义的对象类型数据中的某个属性【不是对象类型】</h1>
    <h2>姓名:{{ Person3.name }}</h2>
    <h2>年龄:{{ Person3.age }}</h2>
    <h2>第一台车:{{ Person3.car.c1 }}</h2>
    <h2>第二台车:{{ Person3.car.c2 }}</h2>
    <button @click="changeName3">修改名字</button>
    <button @click="changeAge3">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeC">修改整个车</button>
    <hr />
    <h1>情况五：监视多个数据</h1>
    <h2>姓名:{{ Person4.name }}</h2>
    <h2>年龄:{{ Person4.age }}</h2>
    <h2>第一台车:{{ Person4.car.c1 }}</h2>
    <h2>第二台车:{{ Person4.car.c2 }}</h2>
    <button @click="changeName4">修改名字</button>
    <button @click="changeAge4">修改年龄</button>
    <button @click="changeC11">修改第一台车</button>
    <button @click="changeC22">修改第二台车</button>
    <button @click="changeCC">修改整个车</button>
  </div>
</template>

<script lang="ts" name="Person234" setup>
import { ref, reactive, watch } from 'vue'
const sum = ref(0)
function changeSum() {
  sum.value += 1
}
const stopWatch = watch(sum, (newV, oldV) => {
  console.log('sum变化了', newV, oldV)
  if (newV > 10) {
    stopWatch()
  }
})

const Person = ref({
  name: '张三',
  age: 18,
})
function changeName() {
  Person.value.name += '~'
}
function changeAge() {
  Person.value.age += 1
}
function changePerson() {
  Person.value = { name: '李四', age: 10 }
}
watch(
  Person,
  (newV, oldV) => {
    console.log('Person变化了', newV, oldV)
  },
  { deep: true, immediate: true },
)
const Person2 = reactive({
  name: '张三',
  age: 18,
})
function changeName2() {
  Person2.name += '~'
}
function changeAge2() {
  Person2.age += 1
}
function changePerson2() {
  Object.assign(Person2, { name: '李四', age: 10 })
}
//reactive默认开启深度监视
watch(
  Person2,
  (newV, oldV) => {
    console.log('Person变化了', newV, oldV)
  },
  { deep: true, immediate: true },
)
const Person3 = reactive({
  name: '张三',
  age: 18,
  car: {
    c1: '奔驰',
    c2: '宝马',
  },
})
function changeName3() {
  Person3.name += '~'
}
function changeAge3() {
  Person3.age += 1
}
function changeC1() {
  Person3.car.c1 = '雅迪'
}
function changeC2() {
  Person3.car.c2 = '大众'
}
function changeC() {
  Person3.car = {
    c1: '奔驰2',
    c2: '宝马2',
  }
}
//监视对象类型中的对象类型数据，写成函数式，并且加上deep:true，就可以监控对象+内部细节
watch(
  () => Person3.car,
  (value) => {
    console.log('Person3.car变化了', value)
  },
  { deep: true },
)
watch(
  () => Person3.car.c1,
  (value) => {
    console.log('Person3.car.c1变化了', value)
  },
)
watch(
  () => Person3.name,
  (value) => {
    console.log('Person3.name变化了', value)
  },
)
const Person4 = reactive({
  name: '张三',
  age: 18,
  car: {
    c1: '奔驰',
    c2: '宝马',
  },
})
function changeName4() {
  Person4.name += '~'
}
function changeAge4() {
  Person4.age += 1
}
function changeC11() {
  Person4.car.c1 = '雅迪'
}
function changeC22() {
  Person4.car.c2 = '大众'
}
function changeCC() {
  Person4.car = {
    c1: '奔驰2',
    c2: '宝马2',
  }
}
watch(
  [() => Person4.name, () => Person4.car.c1],
  (value) => {
    console.log('Person4变化了', value)
  },
  { deep: true },
)
</script>

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
li {
  margin: 4px 0;
  font-size: 20px;
}
</style>
