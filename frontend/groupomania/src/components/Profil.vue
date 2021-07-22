<template>
  <div class="Profile">
      <img id="logo" alt="Vue logo" src="../assets/logo.svg">
    <p>Nom</p>
    <p>Prénom</p>
    <button>Supprimer le compte</button>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>