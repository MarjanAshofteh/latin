import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import aboutus from '@/components/aboutus'
import register from '@/components/register'
import login from '@/components/login'
import profile from '@/components/profile'
import node from '@/components/node'

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
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/node/:nid',
      name: 'node',
      component: node
    },
  ]
})
