<template>
  <div class="Login">
    <form>
        <div id="formulaire_mail">
            <label>Adresse mail : </label>
            <input type="text" name="mail" id="mail_connexion" class="formulaire_input" required>
        </div>

        <div id="formulaire_adresse">
            <label>Mot de passe : </label>
            <input type="text" name="adresse" id="mdp_connexion" class="formulaire_input" required>
        </div>
        <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire"><a href="/Publication">Envoyer la commande</a></button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>