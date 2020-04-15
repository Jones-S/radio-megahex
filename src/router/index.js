import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultView from '../views/DefaultView'
import ArchiveView from '../views/ArchiveView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: DefaultView
  },
  {
    path: '/archive',
    name: 'archive',
    component: ArchiveView
  },
  {
    path: '/*',
    name: 'default',
    component: DefaultView
  },
]

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})
