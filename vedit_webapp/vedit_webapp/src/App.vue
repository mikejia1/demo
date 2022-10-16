<template>
    <SvgCanvas></SvgCanvas>
</template>

<script>
import SvgCanvas from './components/SvgCanvas.vue'

export default {
  name: 'App',
  components: {
    SvgCanvas
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
