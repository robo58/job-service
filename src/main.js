import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import moment from "moment";

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("api_token");

  if (!token && (to.name == 'Login' || to.name == 'Register')) {
    next()
  } else if (!token) {
    next({ name: 'Login' });
  } else if (token && (to.name == 'Login' || to.name == 'Register')) {
    next({ name: 'Jobs' })
  } else {
    next()
  }
})


Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
