<template>
  <div class="Profile">
    <p>{{this.$user.nom}}</p>
    <p>{{this.$user.prenom}}</p>

    <button @click="deleteUser()">Supprimer le compte</button>
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
<style scoped>
</style>