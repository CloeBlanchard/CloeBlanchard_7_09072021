<template>
  <div class="Login">
    <img id="logo" alt="Vue logo" src="../assets/logo.svg">
    <h1>Connectez-vous</h1>
    <form @submit.prevent="connection()">
        <div id="formulaire_mail">
            <label>Adresse mail : </label>
            <input type="text" name="mail" id="mail_connexion" class="formulaire_input" required>
        </div>

        <div id="formulaire_adresse">
            <label>Mot de passe : </label>
            <input type="text" name="adresse" id="mdp_connexion" class="formulaire_input" required>
        </div>
        <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire">Connexion</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  // Instanciation des variables
  data() {
    return {
      message: "",
      errors: []
    };
  },
  // fonction de creation de l'utilisateur
  methods: {
    connection() {
      const email = document.getElementById("mail_connexion").value;
      const password = document.getElementById("mdp_connexion").value;
      axios.post(`http://localhost:3000/api/auth/login`, {
        "email": email,
        "mot_de_passe": password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.message = "Utilisateur inconnu !";
        }
        if (err.response.status === 401) {
          this.message = "Mot de passe ou email non reconnu !";
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>