<template>
    <div class="one_publication">
        <!-- si la publication n'est pas modififié -->
        <div class="publication">
                <!-- affichage du titre -->
                <h2 class="titre">titre: {{this.titre}}</h2>
                <!-- affichage du corps de message -->
                <p class="corps_message">corps de la publication :{{this.corps_message}}</p>
                <!-- affichage de l'image -->
                <p>image</p>
                <img :src="this.image">
        </div>

    </div>
</template>

<script>
// import d'axios
import axios from 'axios'

export default {
    name: 'OnePublication',
    data() {
        return {
            publications: [],
            titre: '',
            corps_message: '',
            image: null,
            authorized: false,
        }
    },
    // monted() appelé lorsque le composant est ajoutée au DOM
    mounted(){
        this.getOnePublication();
    },
    methods: {
        getOnePublication(){
            const id_publication = this.$route.params.id;
            axios.get(`http://localhost:3000/api/publication/${id_publication}`,
                {
                    headers: {
                        authorization: "Bearer: " + this.$token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(response => {
                this.publications = response.data.message[0];
                this.titre = this.publications.titre;
                this.corps_message = this.publications.corps_message;
                this.image = this.publications.image

                // si l'id de l'user est égale l'id user de la publication
                // ou le roleAdmin est égale à 1
                if (this.$user.user_id === this.publications.id_user || this.$user.roleAdmin == 1) {
                    // autoriser les modifications et suppressions de la publication
                    this.authorized = true
                } else {
                    // ne pas authoriser les modifications et suppressions de la publication
                    this.authorized = false
                }
            })
        },
    }
}
</script>
