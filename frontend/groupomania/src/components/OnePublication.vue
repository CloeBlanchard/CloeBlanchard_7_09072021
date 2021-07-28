<template>
    <div class="one_publication">
        <!-- si la publication n'est pas modififié -->
        <div class="publication" v-if="!update">
                <!-- affichage du titre -->
                <h2 class="titre">titre: {{this.publications.titre}}</h2>
                <!-- affichage du corps de message -->
                <p class="corps_message">corps de la publication :{{this.publications.corps_message}}</p>
                <!-- affichage de l'image -->
                <p>image</p>
                <img :src="this.publications.image">
        </div>
        
        <!-- si la publication est modifié -->
        <form class="publication" v-if="update">
            <!-- update du titre -->
            <label for="update_titre">Améliorer le titre :</label>
            <input type="text" id="update_titre" v-model="publications.titre">

            <!-- update du corps de message -->
            <label for="update_corps_message">Améliorer le corps de la publication :</label>
            <input type="text" id="update_corps_message" v-model="publications.corps_message">

            <!-- update de l'image -->
            <label for="update_image">Choisir une nouvelle image :</label>
            <input type="file" id="update_image" @change="configImage"/>
        </form>

        <button v-if="authorized && !update" @click="update = true">Modifier</button>
        <button v-if="update" @click="update = false">Annuler les changements</button>
        <button v-if="update" @click.prevent="updatePublication">Publier les changements</button>   
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
            authorized: false,
            update: false
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
                console.log(this.publications);

                // si l'id de l'user est égale l'id user de la publication
                // ou le roleAdmin est égale à 1
                if (this.$user.id === this.publications.id_user || this.$user.roleAdmin == 1) {
                    // autoriser les modifications et suppressions de la publication
                    this.authorized = true
                } else {
                    // ne pas authoriser les modifications et suppressions de la publication
                    this.authorized = false
                }
            })
        },
        updatePublication() {
            const id_publication = this.$route.params.id;
            let updatePublication = new FormData();
            // condition si le champ titre est complet
            if (this.publications.titre !== null) {
                updatePublication.append("titre", this.publications.titre);
            }
            // condition si le champ corps_message est complet
            if (this.publications.corps_message !== null) {
                updatePublication.append("corps_message", this.publications.corps_message);
            }
            // condition si le champ image est complet
            if (this.image !== null) {
                updatePublication.append("image", this.image);
            }
            
            axios.put(`http://localhost:3000/api/publication/${id_publication}`, updatePublication,
                {
                    headers: {
                        authorization: "Bearer: " + this.$token,
                    }
                }
            )
            .then(response => {
                console.log(response);
            })
        },
        // selectionne l'image choisi
    configImage: function (event) {
      this.image = event.target.files[0]
    },
    }
}
</script>
