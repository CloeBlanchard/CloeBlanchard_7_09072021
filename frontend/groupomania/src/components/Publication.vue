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
        <input type="file" name="image" id="image_publication" class="formulaire_input" @change="setImage"/>
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
    // selectionne l'image choisi
    setImage: function (event) {
      this.image = event.target.files[0]
    },
    // fonction de creation d'une publication
    creationPublication() {
      let newPublication = new FormData();
      // condition si le champ titre est complet
      if (this.titre !== null) {
        newPublication.append("titre", this.titre);
      }
      // condition si le champ corps_message est complet
      if (this.corps_message !== null) {
        newPublication.append("corps_message", this.corps_message);
      }
      // condition si le champ image est complet
      if (this.image !== null) {
        newPublication.append("image", this.image);
      }
      // configuration des headers
      let config = {
        headers: {
          authorization: "Bearer: " + this.$token,
        },
      };
      // condition pour envoyer le titre, le corps_message et l'image dans la requete
      if (this.titre !== null || this.corps_message !== null || this.image !== null) {
        axios.post(`http://localhost:3000/api/publication`, newPublication, config)
        .then((res) => {
          // si la requete est validé
          if (res.status === 201) {
            this.$emit("publications");
          }
        })
        // alert sur la publication crée
        .then(() => {
          alert("Votre publication à été envoyé !");
        })
        // si la publication n'est pas crée
        .catch((error) => {
          console.log(error);
        })
      } 
    },
  },
};
</script>