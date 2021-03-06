import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home.ts'
import SelectWord from '@/views/select_word/select_word.ts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/select-word',
      name: 'select-word',
      component: SelectWord
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about/about.vue')
    }
  ]
})
