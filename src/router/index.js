import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import aboutus from '@/components/aboutus'
import register from '@/components/register'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about-us',
      name: 'aboutus',
      component: aboutus
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
