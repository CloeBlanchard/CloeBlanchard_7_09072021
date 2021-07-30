<template>
  <div class="Public">
    <button><a href="/Profil">Acceder au compte</a></button>
    <p>Création d'une publication</p>
    <!-- fonction de création d'une publication -->
    <form @submit.prevent="creationPublication()">
      <div id="formulaire_titre">
        <label>Titre : </label>
        <input type="text" v-model="titre" name="titre" id="titre_publication" class="formulaire_input" required/>
      </div>

      <div id="formulaire_corps-message">
        <label>Corps de la publication : </label>
        <!-- utilisation de v-model pour crée une liaison de donnée sur les champs du formulaire -->
        <input type="text" v-model="corps_message" name="corps_message" id="message_publication" class="formulaire_input" required/>
      </div>
      <div id="formulaire_image">
        <label>Image : </label>
        <input type="file" @change="configImage" name="image" id="image_publication" class="formulaire_input" required/>
      </div>
      <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire">
        Crée publication
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Publication",
  // Instanciation des variables
  data() {
    return {
      titre: "",
      corps_message: "",
      image: null,
      errors: [],
    };
  },
     
  methods: {
    // fichier de l'image
    configImage: function (event) {
      this.image = event.target.files[0]
    },
    // fonction de creation d'un publication
    creationPublication() {
      const id_user = this.$user.id;
      let PublicationForm = new FormData();
      if (this.titre !== null) {
        PublicationForm.append("titre", this.titre);
      }
      if (this.corps_message !== null) {
        PublicationForm.append("corps_message", this.corps_message);
      }
      if (this.image !== null) {
        PublicationForm.append("image", this.image);
      }
      let config = {
        headers: {
          authorization: "Bearer: " + this.$token,
        }
      }
      console.log(this.$user.id);
      console.log(this.titre);
      console.log(this.corps_message);
      console.log(this.image);
      console.log(this.$token);
      if (this.titre !== null || this.corps_message !== null || this.image) {
        axios.post(`http://localhost:3000/api/publication`, PublicationForm, config,
        {
          "id_user": id_user,
        },
      )
      .then((response) => {
          if (response.status === 201) {
            this.$emit("publications");
          }
        })
      .then(() => {
        alert("Votré publication à été envoyé !")
        location.href = '/affichagePublication'
      })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  }
}
</script>