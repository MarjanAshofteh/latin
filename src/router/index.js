import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/front/home'
import aboutus from '@/components/aboutus'
import register from '@/components/user/register'
import login from '@/components/user/login'
import profile from '@/components/user/profile'
import node from '@/components/node'
import allContents from '@/components/allContents/allContents'
import tags from '@/components/tags/tags'

Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
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
      component: login,
      props: (e) => ({ name: e.query.name })
    },
    {
      path: '/contents',
      name: 'allContents',
      component: allContents,
      props: (e) => ({ name: e.query.name })
    },
    {
      path: '/user/:uid',
      name: 'profile',
      component: profile
    },
    {
      path: '/node/:nid',
      name: 'node',
      component: node
    },
    {
      path: '/tag/:tid/:tname',
      name: 'tags',
      component: tags,
      props: (e) => ({ name: e.query.name })
    },
    { path: '*', redirect: '/' }, // catch all use case
  ]
})
