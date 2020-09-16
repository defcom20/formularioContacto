import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import vuelidate from './plugins/vuelidate';
import axios from './plugins/axios';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  vuelidate,
  axios,
  render: h => h(App)
}).$mount('#app')
