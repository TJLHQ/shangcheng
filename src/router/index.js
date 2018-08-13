import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Item from '@/components/item'
import Checkout from '@/components/checkout'
import Cart from '@/components/car'
Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
  ]
})
