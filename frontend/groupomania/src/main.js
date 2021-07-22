import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Groupomania from './components/Groupomania.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Publication from './components/Publication.vue'
import Profil from './components/Profil.vue'
import Signup2 from './components/testSignup.vue'


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
    path: '/Publication',
    component: Publication
  }, {
    path: '/Profil',
    component: Profil
  }, {
    path: '/signup2',
    component: Signup2
  }]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
