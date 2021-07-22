import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Groupomania from './components/Groupomania.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Publication from './components/Publication.vue'
import Profil from './components/Profil.vue'


Vue.config.productionTip = false

Vue.use(VueRouter)

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
    path: '/profil',
    component: Profil
  }]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
