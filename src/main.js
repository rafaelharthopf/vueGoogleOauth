import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

import App from './App.vue'
import router from './router'

const gauthOption = {
  clientId: '11169353890-nsu0pna710aav1snqn09bsoji17ni5gi.apps.googleusercontent.com',
  scope: 'profile https://www.googleapis.com/auth/contacts',
}

Vue.use(GAuth, gauthOption)

// const config = {
//   apiKey: 'AIzaSyCJ9acxEZDd_tAh0Q2vZlbbLnQy0tjx_bo',
//   clientId: '11169353890-nsu0pna710aav1snqn09bsoji17ni5gi.apps.googleusercontent.com',
//   scope: [
//     'profile',
//     'email',
//     'https://www.googleapis.com/auth/contacts', 
//     'https://www.googleapis.com/auth/contacts.readonly',
//     'https://www.googleapis.com/auth/contacts.other.readonly'
//   ],
// }
// Vue.use(VueGoogleApi, config)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
