import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultView from '../views/DefaultView'
import ArchiveView from '../views/ArchiveView'
import BlogView from '../views/BlogView'
import FilesView from '../views/FilesView'

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
    path: '/blog',
    name: 'blog',
    component: BlogView
  },
  // hidden from robots
  // internal route only used to display files in a better way
  {
    path: '/files',
    name: 'files',
    component: FilesView
  },
  {
    path: '/archive/*',
    name: 'archive-entry',
    component: DefaultView
  },
  {
    path: '/blog/*',
    name: 'blog-entry',
    component: DefaultView
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
