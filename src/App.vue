<template>
  <div id="app">
<v-head></v-head>
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
  import VHead from './components/head.vue'
export default {
  components:{
      VHead
  }
}
</script>

<style>

</style>
