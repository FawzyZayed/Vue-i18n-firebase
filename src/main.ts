import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import i18n from './i18n'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueI18n)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let language = to.params.lang
  if (!language) {
    language = 'en'
  }
  i18n.locale = language
  next()
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
