<template>
  <div>
    <img id="logo" alt="Vue logo" src="../assets/logo.svg">
    <p><button class="redirection_create"><a href="/affichagePublication">Retour aux publications</a></button></p>
    <h1 class="profil">Votre profile</h1>
    <div class="profil_container">
      <p class="info_profil">Votre nom :</p>
      <p class="info_profil2">{{this.$user.nom}}</p>
      <p class="info_profil">Votre prénom :</p>
      <p class="info_profil2">{{this.$user.prenom}}</p>
    </div>
      <p class="info_profil3">Pour vous déconnecter :</p>
      <button class="btn_deconnexion" @click="logOut()">Déconnexion</button>
      <p class="info_profil3">Pous supprimer votre compte :</p>
      <button class="btn_suppresion" @click="deleteUser()">Suppression</button>
    
    </div>
</template>

<script>
// import d'axios
import axios from 'axios'
export default {
  name: 'Profile',
  // montage de l'instance de récupération des publications
  mounted() {
    this.getOneUser();
  },
  methods: {
    // récupération des publications d'un utilisateur
    getOneUser() {
      const id_user = this.$user.id;
      axios.get(`http://localhost:3000/api/auth/user/${id_user}`,
        {
          headers: {
            authorization: "Bearer: " + this.$token,
          },
        }
      )
      .then(response => this.publications = response.data.message)
    },
    // suppression de l'utilisateur
    logOut() {
      localStorage.removeItem('user');
      location.href = "/login"
    },
    deleteUser() {
      const id_user = this.$user.id;
      axios.delete(`http://localhost:3000/api/auth/user/${id_user}`,
        {
          headers: {
            authorization: "Bearer: " + this.$token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(localStorage.removeItem('user'))
      .then(location.href = "/");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.profil_container {
  background-color: #d1515a;
  border-radius: 10px;
  padding: 1px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.39), -0.4em 0 0.4em rgba(0, 0, 0, 0.39);
}
.info_profil {
  font-size: 25px;
  color: lightgrey;

}
.info_profil2, .info_profil3 {
  font-size: 23px;
  color: #091f43;
}
.info_profil2:hover {
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.39), -0.4em 0 0.4em rgba(0, 0, 0, 0.39);
  border-radius: 10px;
  font-size: 25px;
  padding: 8px;
}
.btn_deconnexion, .btn_suppresion {
  padding: 10px;
  font-size: 20px;
  border-radius: 10px;
  color: lightgrey;
  background-color: #091f43;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.39), -0.4em 0 0.4em rgba(0, 0, 0, 0.39);
}
.btn_deconnexion:hover, .btn_suppresion:hover {
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.534), -0.4em 0 0.4em rgba(0, 0, 0, 0.534);
  font-size: 23px;
}
@media screen and (min-width: 500px) {
  .profil_container {
    margin-left: 40px;
    margin-right: 40px;
  }
}
@media screen and (min-width: 620px) {
  .profil_container {
    margin-left: 80px;
    margin-right: 80px;
  }
}
@media screen and (min-width: 768px) {
  .profil_container {
    margin-left: 150px;
    margin-right: 150px;
  }
}
@media screen and (min-width: 868px) {
  .profil_container {
    margin-left: 200px;
    margin-right: 200px;
  }
}
@media screen and (min-width: 950px) {
  .profil_container {
    margin-left: 240px;
    margin-right: 240px;
  }
}
@media screen and (min-width: 1070px) {
  .profil_container {
    margin-left: 290px;
    margin-right: 290px;
  }
}
@media screen and (min-width: 1200px) {
  .profil_container {
    margin-left: 350px;
    margin-right: 350px;
  }
}
</style>