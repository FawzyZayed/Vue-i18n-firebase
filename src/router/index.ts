import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import i18n from '../i18n'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:lang',
    component: { render (c:any) { return c('router-view') } },
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */'../components/auth/signin.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */'../components/auth/signup.vue')
      },
      {
        path: 'additem',
        name: 'additem',
        component: () => import(/* webpackChunkName: "register" */'../components/table/add.vue')
      },
      {
        path: 'showlist',
        name: 'showlist',
        component: () => import(/* webpackChunkName: "register" */'../components/table/list.vue')
      }
    ]
  },
  { path: '/', redirect: `/${i18n.locale}` },
  { path: '*', redirect: `/${i18n.locale}` }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
