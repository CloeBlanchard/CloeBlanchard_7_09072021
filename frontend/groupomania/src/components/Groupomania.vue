<template>
  <div class="Groupomania">
    <img id="logo" alt="Vue logo" src="../assets/logo.svg" />
    <h1 class="accueil">Bienvenue sur le réseau social de votre entreprise</h1>
    <div class="redirection">
      <p class="inscription">Vous pouvez vous inscrire ici :</p>
      <button class="btn_inscrit"><a href="/Signup">Inscription</a></button>
      <p class="connexion">
        Si vous êtes déjà inscrit, vous pouvez vous connecter ici :
      </p>
      <button class="btn-connecte"><a href="/Login">Connexion</a></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Groupomania",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  max-width: 1200px;
  height: 100vh;
}
a {
  text-decoration: none;
  font-size: 20px;
}
.btn_inscrit a,
.btn-connecte a {
  color: white;
}
.accueil {
  font-size: 25px;
  color: #091f43;
}
.inscription,
.connexion {
  font-size: 20px;
  color: white;
}
.redirection {
  background-color: #d1515a;
  padding: 15px;
  border-radius: 20px;
  padding-bottom: 30px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.356),
    -0.4em 0 0.4em rgba(0, 0, 0, 0.356);
}
.btn_inscrit,
.btn-connecte {
  padding: 10px;
  background-color: #091f43;
  border-radius: 10px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.527),
    -0.4em 0 0.4em rgba(0, 0, 0, 0.431);
}
.btn_inscrit:hover,
.btn-connecte:hover {
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.65),
    -0.4em 0 0.4em rgba(0, 0, 0, 0.65);
  font-size: 23px;
}
@media screen and (min-width: 614px) {
  .accueil {
    margin-bottom: 40px;
  }
}
@media screen and (min-width: 768px) {
  .redirection {
    margin-left: 20px;
    margin-right: 20px;
  }
  .inscription,
  .connexion {
    font-size: 25px;
  }
}
@media screen and (min-width: 868px) {
  .redirection {
    margin-left: 70px;
    margin-right: 70px;
  }
}
@media screen and (min-width: 920px) {
  .redirection {
    margin-left: 110px;
    margin-right: 110px;
  }
}
@media screen and (min-width: 1080px) {
  .redirection {
    margin-left: 190px;
    margin-right: 190px;
  }
}
@media screen and (min-width: 1200px) {
  .redirection {
    margin-left: 260px;
    margin-right: 260px;
  }
}
@media screen and (min-width: 1200px) {
  .redirection {
    margin-left: 260px;
    margin-right: 260px;
  }
}
</style>
