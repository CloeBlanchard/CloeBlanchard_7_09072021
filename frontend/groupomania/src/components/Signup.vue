<template>
  <div class="hello">
    <img id="logo" alt="Vue logo" src="../assets/logo.svg">
    <form class="formulaire" @submit.prevent="inscription()">
      <h1 class="accueil">Inscrivez-vous</h1>
        <div id="formulaire_nom">
            <p><label  class="nom">Nom : </label></p>
            <p><input type="text" name="nom" id="nom_inscription" class="formulaire_input" pattern="[A-Z || a-z0-9]{2,100}" required></p>
        </div>

        <div id="formulaire_prenom">
            <p><label  class="prenom">Prénom : </label></p>
            <p><input type="text" name="prenom" id="prenom_inscription" class="formulaire_input" pattern="[A-Z || a-z0-9]{2,100}" required></p>
        </div>

        <div id="formulaire_mail">
            <p><label  class="mail">Adresse mail : </label></p>
            <p><input type="text" name="mail" id="mail_inscription" class="formulaire_input" pattern="[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,50}" required></p>
        </div>

        <div id="formulaire_mdp">
            <p><label  class="password">Mot de passe : </label></p>
            <p><input type="text" name="mdp" id="mdp_inscription" class="formulaire_input" pattern="[A-Z || a-z0-9]{2,100}" required></p>
        </div>

         <button class="btn-connecte" id="envoyer_formulaire" type="submit" name="envoyer_formulaire">Valider l'inscription</button> 
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

<style scoped>
.formulaire {
  margin-top: 50px;
  background-color: #d1515a;
  padding: 15px;
  border-radius: 20px;
  padding-bottom: 30px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.356), -0.4em 0 0.4em rgba(0, 0, 0, 0.356);
}
.accueil {
  font-size: 30px;
}
.formulaire_input {
  font-size: 20px;
  border-radius: 30px;
}
.nom, .prenom, .mail, .password {
  font-size: 25px;
  color: #091f43;
}
.btn-connecte {
  margin-top: 15px;
  color: lightgrey;
  padding: 10px;
  font-size: 20px;
}
.btn-connecte:hover {
  font-size: 22px;
}
@media screen and (min-width: 500px) {
  .formulaire {
    margin-left: 40px;
    margin-right: 40px;
  }
}
@media screen and (min-width: 600px) {
  .formulaire {
    margin-left: 80px;
    margin-right: 80px;
  }
}
@media screen and (min-width: 768px) {
  .formulaire {
    margin-left: 140px;
    margin-right: 140px;
  }
}
@media screen and (min-width: 900px) {
  .formulaire {
    margin-left: 180px;
    margin-right: 180px;
  }
}
@media screen and (min-width: 1000px) {
  .formulaire {
    margin-left: 240px;
    margin-right: 240px;
  }
}
@media screen and (min-width: 1180px) {
  .formulaire {
    margin-left: 340px;
    margin-right: 340px;
  }
}
@media screen and (min-width: 1200px) {
  .formulaire {
    margin-left: 380px;
    margin-right: 380px;
  }
}
</style>