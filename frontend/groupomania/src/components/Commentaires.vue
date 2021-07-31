<template>
  <div>
    <form @submit.prevent="addCommentary()">
      <label for="commentaire">Laisser un commmentaire :</label>
      <input name="nouveau_commentaire" id="commentaire" required />
      <button type="submit" id="envoie_commentaire">Evoyer</button>
    </form>

    <div
      class="commentaire"
      v-for="commentary in commentarys"
      :key="commentary.id"
    >
      <span class="info_commentaire"
        >De {{ commentary.prenom }} {{ commentary.nom }}</span
      >
      {{ commentary.corps_commentaire }}
      <button>Supprimer le commentaire</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "commentaire",
  data() {
    return {
      commentarys: [],
    };
  },
  mounted() {
    this.getAllCommentarys();
  },
  methods: {
    // récupération de tous les commentaires
    getAllCommentarys() {
      const id_publication = parseInt(this.$route.params.id);
      axios
        .get(
          `http://localhost:3000/api/publication/${id_publication}/commentarys`,
          {
            headers: {
              authorization: "Bearer: " + this.$token,
            },
          }
        )
        .then((response) => {
          this.commentarys = response.data.message;
        });
    },
    // ajouter un nouveau commentaire
    addCommentary() {
      // parseInt = analyser une chaine de caractère et renvoie un entier exprimer dans la bdd
      const id_publication = parseInt(this.$route.params.id);
      const user_id = this.$user.id;
      const corps_commentaire = document.getElementById("commentaire").value;

      axios
        .post(
          `http://localhost:3000/api/publication/${id_publication}/commentary`,
          {
            user_id: user_id,
            corps_commentaire: corps_commentaire,
          },
          {
            headers: {
              authorization: "Bearer: " + this.$token,
              "Content-Type": "application/json",
            },
          }
        )
        .then(this.getAllCommentarys());
    },
  },
};
</script>
