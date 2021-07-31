<template>
    <div class="one_publication">
        <img id="logo" alt="Vue logo" src="../assets/logo.svg">
        <p><button class="redirection_create"><a href="/affichagePublication">Retour aux publications</a></button></p>
        <!-- si la publication n'est pas modififié -->
        <div class="Publication" v-if="!update">
                <!-- affichage du titre -->
                <h2 class="parametre">Titre: </h2>
                <p class="parametre2">{{this.publications.titre}}</p>
                <!-- affichage du corps de message -->
                <p class="parametre">Corps de la publication :</p>
                <p class="parametre2">{{this.publications.corps_message}}</p>
                <!-- affichage de l'image -->
                <p class="parametre">Image</p>
                <img :src="this.publications.image" alt="image choisie" class="taille">
        </div>
        
        <!-- si la publication est modifié -->
        <form v-if="update">
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

        <div class="Commentaire" v-for="commentary in commentarys" :key="commentary.id">
            <p class="parametre">Crée le {{dateFormat(commentary.date)}}</p>
            <p class="parametre2">Par {{commentary.prenom}} {{commentary.nom}} : </p>
            <p  class="parametre3">"{{commentary.corps_commentaire}}"</p>
            <button class="btn_envoie" @click="deleteCommentary(commentary.id)" v-if="commentary.id_user == $user.id || $user.roleAdmin == 1" :key="commentary.id">Supprimer le commentaire</button>
        </div>

        <form class="Commentaire" @submit.prevent="addCommentary()">
            <p class="parametre"><label for="commentaire">Laisser un commmentaire :</label></p>
            <p><input name="nouveau_commentaire" id="commentaire" required/></p>
            <button class="btn_envoie_commentaire" type="submit" id="envoie_commentaire">Envoyer</button>
        </form>

        <p><button class="btn_envoie" v-if="authorized && !update" @click="update = true">Modifier la publication</button></p>
        <p><button class="btn_envoie" v-if="update" @click="update = false">Annuler les changements</button></p>
        <p><button class="btn_envoie" v-if="update" @click.prevent="updatePublication">Publier les changements</button></p>
        <p><button class="btn_envoie" v-if="!update" @click="deletePublication()">Suppression de la publication</button></p>
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
            update: false,
            commentarys: []
        }
    },
    // monted() appelé lorsque le composant est ajoutée au DOM
    mounted(){
        this.getOnePublication();
        this.getAllCommentarys();
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
            .then(location.href = '/affichagePublication');
        },
        // selectionne l'image choisi
        configImage: function (event) {
            this.image = event.target.files[0]
        },
        deletePublication() {
            const id_publication = this.$route.params.id;
            axios.delete(`http://localhost:3000/api/publication/${id_publication}`,
                {
                    headers: {
                        authorization: "Bearer: " + this.$token,
                    }
                }
            )
            .then(location.href = '/affichagePublication')
        },
        // récupération de tous les commentaires
        getAllCommentarys() {
            const id_publication = this.$route.params.id;
            axios.get(`http://localhost:3000/api/publication/${id_publication}/commentarys`,
                {
                    headers: {
                        authorization: "Bearer: " + this.$token,
                    },
                }
            )
            .then(response => {
                this.commentarys = response.data.message
            })
        },
        // ajouter un nouveau commentaire
        addCommentary() {
            const id_publication = this.$route.params.id;
            const user_id = this.$user.id;
            const corps_commentaire = document.getElementById("commentaire").value;

            axios.post(`http://localhost:3000/api/publication/${id_publication}/commentary`,
                {
                    "id_user": user_id,
                    "corps_commentaire": corps_commentaire,
                },
                {
                    headers: {
                        authorization: "Bearer: " + this.$token,
                        'Content-Type': 'application/json'
                    },
                }
            )
            .then(this.getAllCommentarys());
        },
        deleteCommentary(commentaryId) {
            axios.delete(`http://localhost:3000/api/publication/commentary/${commentaryId}`,
                {
                    headers: {
                        authorization: "Bearer: " + this.$token,
                        'Content-Type': 'application/json'
                    },
                }
            )
            .then(this.getAllCommentarys());
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

<style>
.Publication, .Commentaire {
    background-color: #d1515a;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.356), -0.4em 0 0.4em rgba(0, 0, 0, 0.356);
}
.parametre {
    font-size: 25px;
    color: #091f43;
    font-weight: bold;
}
.parametre2 {
    font-size: 23px;
    color: lightgrey;
    font-weight: bold;
}
.parametre3 {
    font-size: 20px;
    font-weight: bold;
}
.btn_envoie, .btn_envoie_commentaire {
    font-size: 20px;
    margin-bottom: 30px;
    background-color: #091f43;
    color: lightgrey;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.527), -0.4em 0 0.4em rgba(0, 0, 0, 0.431);
}
.btn_envoie_commentaire {
    margin-top: 10px;
    margin-bottom: 0px;
}
#commentaire {
    font-size: 20px;
    border-radius: 30px;
    color: black;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.527), -0.4em 0 0.4em rgba(0, 0, 0, 0.431);
}
.btn_envoie:hover, .btn_envoie_commentaire:hover {
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.65), -0.4em 0 0.4em rgba(0, 0, 0, 0.65);
    font-size: 23px;
}
@media screen and (min-width: 568px) {
    .Publication, .Commentaire {
        margin-left: 30px;
        margin-right: 30px;
    }
}
@media screen and (min-width: 650px) {
    .Publication, .Commentaire {
        margin-left: 60px;
        margin-right: 60px;
    }
}
@media screen and (min-width: 790px) {
    .Publication, .Commentaire {
        margin-left: 130px;
        margin-right: 130px;
    }
}
@media screen and (min-width: 930px) {
    .Publication, .Commentaire {
        margin-left: 190px;
        margin-right: 190px;
    }
}
@media screen and (min-width: 1060px) {
    .Publication, .Commentaire {
        margin-left: 230px;
        margin-right: 230px;
    }
}
@media screen and (min-width: 1200px) {
    .Publication, .Commentaire {
        margin-left: 290px;
        margin-right: 290px;
    }
}
</style>