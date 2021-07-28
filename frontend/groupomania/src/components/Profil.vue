<template>
  <div class="Profile">
      <img id="logo" alt="Vue logo" src="../assets/logo.svg">
    <p>{{this.$user.nom}}</p>
    <p>{{this.$user.prenom}}</p>

    <div v-for="publication in publications" :key="publication.id">
      <router-link :to="{ name: 'Publications', params: { id: publication.id }}">
        <p>{{publication.titre}}</p>
      </router-link>
    </div>
    <button @click="deleteUser()">Supprimer le compte</button>
  </div>
</template>

<script>
// import d'axios
import axios from 'axios'
export default {
  name: 'Profile',
  data() {
    return {
      publications: [],
    }
  },
  mounted() {
    this.getUserPublications();
  },
  methods: {
    // récupération des publications d'un utilisateur
    getUserPublications() {
      const id_user = this.$user.id;
      axios.get(`http://localhost:3000/api/user${id_user}/publications`,
        {
          headers: {
            authorization: "Bearer: " + this.$token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(response => this.publications = response.data.message)
    },
    deleteUser() {
      const id_user = this.$user.id;
      axios.delete(`http://localhost:3000/api/auth/${id_user}`,
        {
          headers: {
            authorization: "Bearer: " + this.$token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(localStorage.removeItem('user'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>