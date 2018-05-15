// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import { mapGetters } from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './assets/app.scss'

Vue.use(VueMaterial)
Vue.config.productionTip = false

/*this is root instance*/
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
