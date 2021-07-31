<template>
  <div>
    <img id="logo" alt="Vue logo" src="../assets/logo.svg" />
    <p>
      <button class="redirection_create">
        <a href="/publication">Créer une publication</a>
      </button>
    </p>
    <p>
      <button class="redirection_profil">
        <a href="/affichagePublication/profil/:id">Acceder a votre profil</a>
      </button>
    </p>
    <!-- boucle sur les publications créées -->
    <article
      class="publication"
      v-for="publication in publications"
      :key="publication.id"
    >
      <!-- composant pour activer la navigation utilisateur dans une application où le routeur est activé -->
      <router-link
        :to="{ name: 'OnePublication', params: { id: publication.id } }"
      >
        <div>
          <!-- dataFormat pour afficher la date de création de publication + affichage du nom et du prenom de l'utilisateur -->
          <span class="info">Crée le {{ dateFormat(publication.date) }}</span>
          <p class="info">Par {{ publication.prenom }} {{ publication.nom }}</p>

          <!-- condition si l'utilisateur correspond a l'id logger ou si il y a un admin -->
          <span
            class="update"
            v-if="publication.id_user == $user.id_user || $user.roleAdmin == 1"
            >Modifier</span
          >
        </div>
        <!-- affichage du titre de la publication -->
        <h2 class="info2">{{ publication.titre }}</h2>
        <!-- affichage du corps du message -->
        <p class="info2">{{ publication.corps_message }}</p>
        <!-- affichage du message -->
        <img :src="publication.image" alt="image choisie" class="taille" />
      </router-link>
    </article>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AffichePublication",
  data() {
    return {
      errors: [],
      publications: [],
    };
  },
  // montage de l'instance de récupération des publications
  mounted() {
    // si les data user sont défini dans le locastorage
    if (localStorage.user != undefined) {
      // récupération de toutes les publications
      this.getAllPublications();
    }
    // exports de la fonction de récupération de toutes les publications
    this.$root.$on("Publications", () => {
      this.getAllPublications();
    });
  },
  methods: {
    // fonction de récupération de toutes les publications
    getAllPublications() {
      axios
        .get(`http://localhost:3000/api/publications`, {
          headers: {
            authorization: "Bearer: " + this.$token,
            "Content-Type": "application/json",
          },
        })
        // reponse de la requete
        .then((res) => {
          this.publications = res.data.message;
        });
    },
    // fonction d'envoie de la date de création de publication
    dateFormat(date) {
      // evenement de date
      const event = new Date(date);
      // déclaration des options de jour, mois etc
      const option = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      // envoie de l'event
      return event.toLocaleDateString("fr-FR", option);
    },
  },
};
</script>

<style>
.redirection_create a,
.redirection_profil a {
  color: lightgrey;
}
.redirection_create,
.redirection_profil {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #091f43;
  border-radius: 10px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.527),
    -0.4em 0 0.4em rgba(0, 0, 0, 0.431);
}
.redirection_create:hover,
.redirection_profil:hover {
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.65),
    -0.4em 0 0.4em rgba(0, 0, 0, 0.65);
  font-size: 23px;
}
.publication {
  background-color: #d1515a;
  padding: 2%;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.356),
    -0.4em 0 0.4em rgba(0, 0, 0, 0.356);
}
.publication:hover {
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.664),
    -0.4em 0 0.4em rgba(0, 0, 0, 0.664);
}
.info {
  color: lightgrey;
  font-size: 22px;
}
.info2 {
  color: #091f43;
}
.taille {
  width: 180px;
  object-fit: cover;
}
@media screen and (min-width: 600px) {
  .publication {
    margin-left: 30px;
    margin-right: 30px;
  }
}
@media screen and (min-width: 690px) {
  .publication {
    margin-left: 70px;
    margin-right: 70px;
  }
}
@media screen and (min-width: 768px) {
  .publication {
    margin-left: 90px;
    margin-right: 90px;
  }
  .info {
    font-size: 24px;
  }
  .info2 {
    font-size: 27px;
  }
}
@media screen and (min-width: 868px) {
  .publication {
    margin-left: 130px;
    margin-right: 130px;
  }
}
@media screen and (min-width: 920px) {
  .publication {
    margin-left: 150px;
    margin-right: 150px;
  }
}
@media screen and (min-width: 1080px) {
  .publication {
    margin-left: 220px;
    margin-right: 220px;
  }
}
@media screen and (min-width: 1200px) {
  .publication {
    margin-left: 320px;
    margin-right: 320px;
  }
}
</style>