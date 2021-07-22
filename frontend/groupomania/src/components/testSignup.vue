<template>
  <div class="hello">
    <img id="logo" alt="Vue logo" src="../assets/logo.svg" />
    <h1>Inscrivez-vous</h1>
    <form @submit.prevent="inscrit()">
      <div id="formulaire_nom">
        <label>Nom :</label>
        <input type="text" v-model="nom" name="nom" id="nom_inscription" class="formulaire_input" pattern="[A-Z || a-z0-9]{2,100}" required/>
      </div>

      <div id="formulaire_prenom">
        <label>Prénom :</label>
        <input type="text" v-model="prenom" name="prenom" id="prenom_inscription" class="formulaire_input" pattern="[A-Z || a-z0-9]{2,100}" required/>
      </div>

      <div id="formulaire_mail">
        <label>Adresse mail : </label>
        <input type="text" v-model="mail" name="mail" id="mail_inscription" class="formulaire_input" pattern="[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,50}" required/>
      </div>

      <div id="formulaire_mdp">
        <label>Mot de passe : </label>
        <input type="text" v-model="password" name="mdp" id="mdp_inscription" class="formulaire_input" pattern="[A-Z || a-z0-9]{2,100}" required/>
      </div>

      <input id="testBtn" type="button" @click="inscrit" value="Création"/>
    
      <input id="testBtn" type="button" @click="displayInConsole" value="Cliquer pour afficher dans la console"/>
    </form>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "Signup2",
  data() {
    return {
      prenom: "",
      nom: "",
      mail: "",
      password: "",
    };
  },
  computed: {
    joinTheNames() {
      return `${this.prenom} | ${this.nom} | ${this.mail} | ${this.password}`;
    },
  },
  methods: {
    displayInConsole() {
      console.log(this.joinTheNames);
    },
    inscrit() {

        
    }
  }
}
</script>
