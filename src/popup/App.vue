<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import {ref} from "vue";

const rate = ref(0)
const Github = () => {
  window.open( "https://github.com/rickhqh/Raw2Repo")
}
const Blog = () => {
  window.open( "https://blog.rick.icu")
}

</script>

<template>
  <div class="div">
    <h1 style="text-align:center">Raw2Repo</h1>
    <h2 style="text-align:center">快捷切换代码托管平台raw页面</h2>
    <div>
      <div class="demo-type">
        <div>
          <el-avatar :size="80" src="https://blog.rick.icu/rick.jpeg" class="img"/>
        </div>
      </div>
    </div>
    <div class="demo-type">
      <div/>
      <el-rate v-model="rate" size="large" style="margin: 0 auto;"/>
      <div/>
    </div>
    <div class="demo-type">
      <div>
        <el-button type="primary" round @click="Github">Github</el-button>
      </div>
      <div>
        <el-button type="success" round @click="Blog">Blog</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.demo-type {
  display: flex;
}

.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
