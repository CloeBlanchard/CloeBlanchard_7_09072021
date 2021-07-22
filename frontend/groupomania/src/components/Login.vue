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
        <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire"><a href="/Publication">Envoyer la commande</a></button>
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
      })
      .then(response => {
        if (response.status === 201) {
          location.href = '/publication'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>