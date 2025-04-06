import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartPage.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/checkout/CheckoutCart.vue')
  },
  {
    path: '/checkout/information',
    name: 'CheckoutInformation',
    component: () => import('@/views/checkout/CheckoutInformation.vue')
  },
  {
    path: '/checkout/success',
    name: 'CheckoutSuccess',
    component: () => import('@/views/checkout/CheckoutSuccess.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
