<template>
  <div class="Public">
    
    <button><a href="/Profil">Acceder au compte</a></button>
    <p>Création d'une publication</p>
    <form @submit.prevent="creationPublication()">
        <div id="formulaire_titre">
            <label>Titre : </label>
            <input type="text" name="titre" id="titre_publication" class="formulaire_input" required>
        </div>

        <div id="formulaire_corps-message">
            <label>Corps de la publication : </label>
            <input type="text" name="corps_message" id="message_publication" class="formulaire_input" required>
        </div>

        <div id="formulaire_image">
            <label>Image : </label>
            <input type="file" name="image" id="image_publication" class="formulaire_input" required>
        </div>
        <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire"><a href="/Publication">Publier la publication</a></button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Publication',
  // Instanciation des variables
  data() {
    return {
      errors: []
    };
  },
  // fonction de creation de l'utilisateur
  methods: {
    creationPublication() {
      const titre = document.getElementById("titre_publication").value;
      const corps_message = document.getElementById("message_publication").value;
      const image = document.getElementById("image_publication").value;

      axios.post(`http://localhost:3000/api/publication`, 
        {
          "titre": titre,
          "corps_message": corps_message,
          "image": image,
        })
        .then(response => {
          if (response.status === 201) {
            location.href = '/profil'
          }
          console.log(response);
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>