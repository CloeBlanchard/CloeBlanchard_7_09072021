<template>
  <div class="Acceuil">
    <p>Création d'une publication</p>
    <form>
        <div id="formulaire_titre">
            <label>Titre : </label>
            <input type="text" name="titre" id="titre_publication" class="formulaire_input" required>
        </div>

        <div id="formulaire_corps-message">
            <label>Publication : </label>
            <input type="text" name="corps_message" id="message_publication" class="formulaire_input" required>
        </div>

        <div id="formulaire_image">
            <label>Image : </label>
            <!-- <input type="image" name="image" id="image_publication" class="formulaire_input" required> -->
        </div>
        <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire"><a href="/Publication">Envoyer la commande</a></button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Publication',
  props: {
    msg: String
  }
}
</script>