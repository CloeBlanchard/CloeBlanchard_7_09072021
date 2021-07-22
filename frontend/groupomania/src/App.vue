<template>
  <div id="app">
    <router-view><Groupomania/></router-view>
  </div>
</template>

<script>
import Groupomania from './components/Groupomania.vue'

export default {
  name: 'App',
  components: {
    Groupomania,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
}
#logo {
  width: 400px;
}
</style>
