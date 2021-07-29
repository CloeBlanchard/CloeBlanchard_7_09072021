<template>
  <div id="accueil">
    <Groupomania v-if="!connected"/>
    
  </div>
</template>

<script>
import Groupomania from '../components/Groupomania.vue'

export default {
  name: 'App',
  components: {
    Groupomania
  }
}
</script>