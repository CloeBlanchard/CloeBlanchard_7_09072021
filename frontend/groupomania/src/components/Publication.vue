<template>
  <div class="Public">
    <button><a href="/Profil">Acceder au compte</a></button>
    <p>Création d'une publication</p>
    <form @submit.prevent="creationPublication()">
      <div id="formulaire_titre">
        <label>Titre : </label>
        <input
          type="text"
          v-model="titre"
          name="titre"
          id="titre_publication"
          class="formulaire_input"
          required
        />
      </div>

      <div id="formulaire_corps-message">
        <label>Corps de la publication : </label>
        <input
          type="text"
          v-model="corps_message"
          name="corps_message"
          id="message_publication"
          class="formulaire_input"
          required
        />
      </div>

      <div id="formulaire_image">
        <label>Image : </label>
        <input
          type="file"
          name="image"
          id="image_publication"
          class="formulaire_input"
          @change="setImage"
        />
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
    setImage: function (event) {
      this.image = event.target.files[0]
    },
    // fonction de creation d'une publication
    creationPublication() {
      let newPublication = new FormData();
      if (this.titre !== null) {
        newPublication.append("titre", this.titre);
      }
      if (this.corps_message !== null) {
        newPublication.append("corps_message", this.corps_message);
      }
      if (this.image !== null) {
        newPublication.append("image", this.image);
      }
      let config = {
        headers: {
          authorization: "Bearer: " + this.$token,
          "Content-Type": "multipart/form-data",
        },
      };
      if (this.titre !== null || this.corps_message !== null || this.image !== null) {
        axios.post(`http://localhost:3000/api/publication`, newPublication, config)
        .then((res) => {
          if (res.status === 201) {
            this.$emit("publications");
          }
        })
        .then(() => {
          alert("Votre publication à été envoyé !");
        })
        .catch((error) => {
          console.log(error);
        })
      }

      // const titre = document.getElementById("titre_publication");
      // const corps_message = document.getElementById("message_publication");
      // const image = document.getElementById("image_publication");
      // const token = this.$token;
      // axios.post(`http://localhost:3000/api/publication`,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //       authorization: 'Bearer: ' + token,
      //     },
      //     body: {
      //       "titre": titre,
      //       "corps_message": corps_message,
      //       "image": image,
      //     }
      //   }
      // )
        
    },
  },
};
</script>