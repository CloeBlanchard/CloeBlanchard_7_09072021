<template>
  <div class="hello">
    <form>
        <div id="formulaire_nom">
            <label>Nom : </label>
            <input type="text" name="nom" id="nom_inscription" class="formulaire_input" required>
        </div>

        <div id="formulaire_prenom">
            <label>Prénom : </label>
            <input type="text" name="prenom" id="prenom_inscription" class="formulaire_input" required>
        </div>

        <div id="formulaire_mail">
            <label>Adresse mail : </label>
            <input type="text" name="mail" id="mail_inscription" class="formulaire_input" required>
        </div>

        <div id="formulaire_mdp">
            <label>Mot de passe : </label>
            <input type="text" name="mdp" id="mdp_inscription" class="formulaire_input" required>
        </div>
        <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire">Envoyer la commande</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  props: {
    msg: String
  }
}
</script>