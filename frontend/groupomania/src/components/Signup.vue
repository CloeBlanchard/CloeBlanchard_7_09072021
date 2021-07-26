<template>
  <div class="hello">
    <img id="logo" alt="Vue logo" src="../assets/logo.svg">
    <h1>Inscrivez-vous</h1>
    <form @submit.prevent="inscription()">
        <div id="formulaire_nom">
            <label>Nom : </label>
            <input type="text" name="nom" id="nom_inscription" class="formulaire_input" pattern="[A-Z || a-z0-9]{2,100}" required>
        </div>

        <div id="formulaire_prenom">
            <label>Prénom : </label>
            <input type="text" name="prenom" id="prenom_inscription" class="formulaire_input" pattern="[A-Z || a-z0-9]{2,100}" required>
        </div>

        <div id="formulaire_mail">
            <label>Adresse mail : </label>
            <input type="text" name="mail" id="mail_inscription" class="formulaire_input" pattern="[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,50}" required>
        </div>

        <div id="formulaire_mdp">
            <label>Mot de passe : </label>
            <input type="text" name="mdp" id="mdp_inscription" class="formulaire_input" pattern="[A-Z || a-z0-9]{2,100}" required>
        </div>

         <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire">Valider l'inscription</button> 
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  // Instanciation des variables
  data() {
    return {
      errors: []
    };
  },
  // fonction de creation de l'utilisateur
  methods: {
    inscription() {
      const nom = document.getElementById("nom_inscription").value;
      const prenom = document.getElementById("prenom_inscription").value;
      const email = document.getElementById("mail_inscription").value;
      const password = document.getElementById("mdp_inscription").value;
      axios.post(`http://localhost:3000/api/auth/signup`, {
        "nom": nom,
        "prenom": prenom,
        "email": email,
        "mot_de_passe": password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.status === 201) {
          location.href = '/login'
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