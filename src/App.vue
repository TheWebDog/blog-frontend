<template>
  <div id="app"  v-title data-title="Web Dog's Blog">
    <router-view></router-view>
    <el-backtop :bottom="100" :visibility-height="10"></el-backtop>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('./style/index.css');
</style>
