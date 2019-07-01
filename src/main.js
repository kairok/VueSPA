// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
//import * as fb from 'firebase'


Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    var firebaseConfig = {
    apiKey: "AIzaSyAPZkoMDECveFuarSpFmkMzpgSJ1VsDRlA",
    authDomain: "its-ads-5a856.firebaseapp.com",
    databaseURL: "https://its-ads-5a856.firebaseio.com",
    projectId: "its-ads-5a856",
    storageBucket: "",
    messagingSenderId: "278835538021",
    appId: "1:278835538021:web:9d55d57af55475db"
    };
  }
})
