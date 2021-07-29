import Vue from 'vue'
import App from './App.vue'
// import de vue router
import VueRouter from 'vue-router'
// import du component de vue
import Groupomania from './components/Groupomania.vue'
// import du component de login
import Login from './components/Login.vue'
// import du component de creation d'un utilisateur
import Signup from './components/Signup.vue'
// import du component de la création d'une publication
import Publication from './components/Publication.vue'
// import du component du profil
import Profil from './components/Profil.vue'
// import de l'affichage des publications
import AffichePublication from './components/AffichePublication.vue'
// import de l'affichage d'une publication
import OnePublication from './components/OnePublication.vue'


Vue.config.productionTip = false

// utilisation du router
Vue.use(VueRouter)

// route des vues
const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    component: Groupomania,
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/Signup',
    component: Signup
  }, {
    path: '/publication',
    component: Publication
  }, {
    path: '/profil/:id',
    component: Profil,
    name: 'ProfilUtilisateur'
  }, {
    path: '/affichagePublication',
    component: AffichePublication,
    name: 'Publications'
  }, {
    path: '/affichageOnePublication/:id',
    component: OnePublication,
    name: 'OnePublication'
  }]
})

// parse de l'utilisateur et du token
if (localStorage.user != undefined) {
  Vue.prototype.$token = JSON.parse(localStorage.user).token;
  Vue.prototype.$user = JSON.parse(localStorage.user);
}

// export des vues
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
