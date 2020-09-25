<template>
  <div id="app">
    <div class="app-main">
      <router-view/>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {}
    },
    mounted () {
    },
    methods: {

    }
  }
</script>
<style lang="less">
  *{
    padding: 0;
    margin: 0;
    font-size: 0.6rem;
  }
  html{
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    font-size: 20px;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
  }
  body{
    height: 100%;
  }
</style>
