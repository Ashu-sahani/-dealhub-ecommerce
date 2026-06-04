import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import Cart from '../views/Cart.vue'

const routes = [
  { path: '/', component: ProductList },
  { path: '/cart', component: Cart }
]

export default createRouter({ history: createWebHistory(), routes })
