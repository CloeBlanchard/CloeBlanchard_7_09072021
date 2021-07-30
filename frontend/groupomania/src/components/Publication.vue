<template>
  <div class="Public">
    <img id="logo" alt="Vue logo" src="../assets/logo.svg">
    <h1 class="accueil">Création d'une publication</h1>
    <!-- fonction de création d'une publication -->
    <form class="new_publication" @submit.prevent="creationPublication()">
      <div id="formulaire_titre">
        <p class="form"><label>Titre : </label></p>
        <p><input type="text" v-model="titre" name="titre" id="titre_publication" class="formulaire_input" required/></p>
      </div>

      <div id="formulaire_corps-message">
        <p class="form"><label>Corps de la publication : </label></p>
        <!-- utilisation de v-model pour crée une liaison de donnée sur les champs du formulaire -->
        <p><input type="text" v-model="corps_message" name="corps_message" id="message_publication" class="formulaire_input" required/></p>
      </div>
      <div id="formulaire_image">
        <p class="form"><label>Image : </label></p>
        <p><input type="file" @change="configImage" name="image" id="image_publication" class="formulaire_input" required/></p>
      </div>
      <p><button class="create_publication" id="envoyer_formulaire" type="submit" name="envoyer_formulaire">Créer publication</button></p>
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

<style>
.new_publication {
  background-color: #d1515a;
  border-radius: 20px;
  padding: 10px;
}
.redirection_profil {
  margin-top: 10px;
}
.formulaire_input {
  font-size: 20px;
  border-radius: 30px;
  color: lightgrey;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.527), -0.4em 0 0.4em rgba(0, 0, 0, 0.431);
}
.create_publication {
  font-size: 20px;
  border-radius: 10px;
  background-color: #091f43;
  color: lightgrey;
  padding: 8px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.527), -0.4em 0 0.4em rgba(0, 0, 0, 0.431);
}
.create_publication:hover, .formulaire_input:hover {
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.65), -0.4em 0 0.4em rgba(0, 0, 0, 0.65);
  font-size: 23px;
}
.form {
  font-size: 20px;
  color: #091f43;
  font-weight: bold;
}
@media screen and (min-width: 500px) {
  .new_publication {
    margin-left: 20px;
    margin-right: 20px;
  }
}
@media screen and (min-width: 660px) {
  .new_publication {
    margin-left: 70px;
    margin-right: 70px;
  }
}
@media screen and (min-width: 768px) {
  .new_publication {
    margin-left: 140px;
    margin-right: 140px;
  }
  .create_publication {
    margin-top: 20px;
  }
}
@media screen and (min-width: 870px) {
  .new_publication {
    margin-left: 170px;
    margin-right: 170px;
  }
}
@media screen and (min-width: 970px) {
  .new_publication {
    margin-left: 200px;
    margin-right: 200px;
  }
}
@media screen and (min-width: 870px) {
  .new_publication {
    margin-left: 260px;
    margin-right: 260px;
  }
}
@media screen and (min-width: 870px) {
  .new_publication {
    margin-left: 300px;
    margin-right: 300px;
  }
}
</style>