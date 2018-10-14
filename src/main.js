// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Meta from 'vue-meta'
import store from './store/store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './assets/app.scss'

Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.use(Meta)

/*this is root instance*/
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data(){
    return{
      title:'808 Educational and Engineering institute',
      description:'A civil engineering social media, providing online training courses in all different fields of civil engineering and architecture focusing on Performance-based design of Structures (PBD) and Building Information Modeling (BIM) and other new trendes in the form of articles, videos, podcasts, ebooks and so on.'
    }
  },
  metaInfo(){
    return{
      // Children can override the title.
      title: '808 Educational and Engineering institute',
      titleTemplate: '%s | 808 Educational and Engineering institute',
      meta: [
        { charset: 'utf-8' },
        {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'description', content: this.description, vmid: 'description'},

        // OpenGraph data (Most widely used)
        {property: 'og:title', content: this.title, vmid: 'og:title'},
        {property: 'og:type', content: 'website', vmid: 'og:type'},
        {property: 'og:url', content: 'http://ed808.com', vmid: 'og:url'},
        {property: 'og:image', content: "http://ed808.com/staticfile/top-banner.jpg", vmid: 'og:image'},
        {property: 'og:description', content: this.description, vmid: 'og:description'},
        {property: 'og:site_name', content: '808 Educational and Engineering institute'},

        // Twitter card
        {name: 'twitter:card', content:'summary'},
        {name: 'twitter:title', content: this.title, vmid: 'twitter:title'},        
        {name: 'twitter:description', content: this.description, vmid: 'twitter:description'},
        {name: 'twitter:image:src', content: 'http://ed808.com/staticfile/top-banner.jpg', vmid: 'twitter:image:src'},
        {name: 'twitter:site', content: 'http://ed808.com'},

        // Your twitter handle, if you have one.
        {name: 'twitter:creator', content: ''},

        // Google / Schema.org markup:
        {itemprop: 'name', content: this.title, vmid: 'name'},
        {itemprop: 'description', content: this.description, vmid: 'description'},
        {itemprop: 'image', content: 'http://ed808.com/staticfile/top-banner.jpg', vmid: 'image'},
      ],
      links:[
        {rel: 'alternate', href: 'http://ed808.com', hreflang:'en'}
      ]
    }
  }
})
