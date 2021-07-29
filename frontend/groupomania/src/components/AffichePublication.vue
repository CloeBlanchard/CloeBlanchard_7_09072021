<template>
  <div>
      <button><a href="/publication">Créer une publication</a></button>
      <!-- boucle sur les publications créées -->
      <article class="publication" v-for="publication in publications" :key="publication.id">
          <!-- composant pour activer la navigation utilisateur dans une application où le routeur est activé -->
          <router-link :to="{ name: 'OnePublication', params: { id: publication.id} }">
              <div>
                  <!-- dataFormat pour afficher la date de création de publication + affichage du nom et du prenom de l'utilisateur -->
                  <span class="info">Crée le {{dateFormat(publication.date)}} par {{publication.prenom}} {{publication.nom}}</span>
            
                  <!-- condition si l'utilisateur correspond a l'id logger ou si il y a un admin -->
                  <span class="update" v-if="publication.id_user == $user.id_user || $user.roleAdmin == 1">Modifier</span>
              </div>
              <!-- affichage du titre de la publication -->
              <h2 class="titre">{{publication.titre}}</h2>
              <!-- affichage du corps du message -->
              <p class="contenue">{{publication.corps_message}}</p>
              <!-- affichage du message -->
              <img :src="publication.image" alt="image choisie">
          </router-link>
          
      </article>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'AffichePublication',
    data() {
        return {
            errors: [],
            publications: [],
        }
    },
    // montage de l'instance de récupération des publications
    mounted() {
        // si les data user sont défini dans le locastorage
        if (localStorage.user != undefined) {
            // récupération de toutes les publications
            this.getAllPublications();
        }
        // exports de la fonction de récupération de toutes les publications
        this.$root.$on('Publications', () => {
            this.getAllPublications();
        });
    },
    methods: {
        // fonction de récupération de toutes les publications
        getAllPublications() {
            axios.get(`http://localhost:3000/api/publications`,
                {
                    headers: {
                        authorization: "Bearer: " + this.$token,
                        "Content-Type": "application/json",
                    },
                }
            )
            // reponse de la requete
            .then(res => {
                this.publications = res.data.message;
            })
        },
        // fonction d'envoie de la date de création de publication
        dateFormat(date) {
            // evenement de date
            const event = new Date(date);
            // déclaration des options de jour, mois etc
            const option = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
            // envoie de l'event
            return event.toLocaleDateString('fr-FR', option);
        }
    }
}
</script>

<style scoped>
</style>