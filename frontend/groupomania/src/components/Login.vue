<template>
  <div class="Login">
    <img id="logo" alt="Vue logo" src="../assets/logo.svg">
    <form class="formulaire" @submit.prevent="connection()">
      <h1 class="accueil">Connectez-vous</h1>
        <div id="formulaire_mail">
            <label class="mail">Adresse mail : </label>
            <p><input type="text" name="mail" id="mail_connexion" class="formulaire_input" required></p>
        </div>

        <div id="formulaire_adresse">
            <label class="password">Mot de passe : </label>
            <p><input type="text" name="adresse" id="mdp_connexion" class="formulaire_input" required></p>
        </div>
        <button class="btn-connecte" type="submit" name="envoyer_formulaire">Connexion</button>
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
        if (response.status === 200) {
          location.href = "/affichagePublication"
        }
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
.accueil {
  font-size: 30px;
}
.formulaire {
  margin-top: 50px;
  background-color: #d1515a;
  padding: 15px;
  border-radius: 20px;
  padding-bottom: 30px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.356), -0.4em 0 0.4em rgba(0, 0, 0, 0.356);
}
.formulaire_input {
  font-size: 20px;
}
.mail, .password {
  font-size: 25px;
  color: #091f43;
}
.formulaire_mail, .formulaire_adresse {
  margin-top: 20px;
}
.btn-connecte {
  margin-top: 15px;
  color: white;
  padding: 10px;
  font-size: 20px;
}
.btn-connecte:hover {
  font-size: 22px;
}
@media screen and (min-width: 614px) {
  .accueil {
    margin-bottom: 20px;
  }
}
@media screen and (min-width: 768px) {
  .formulaire {
    margin-left: 50px;
    margin-right: 50px;
  }
}
@media screen and (min-width: 868px) {
  .formulaire {
    margin-left: 150px;
    margin-right: 150px;
  }
}
@media screen and (min-width: 920px) {
  .formulaire {
    margin-left: 180px;
    margin-right: 180px;
  }
}
@media screen and (min-width: 1080px) {
  .formulaire {
    margin-left: 220px;
    margin-right: 220px;
  }
}
</style>