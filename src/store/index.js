import Vue from 'vue'
import Vuex from 'vuex'
import productsData from '@/data/products.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkout: {
      items: [],
      customerInfo: {
        name: '',
        phone: '',
        address: '',
        city: '',
        paymentMethod: 'easypaisa'
      }
    }
  },
  getters: {
    allProducts: state => state.products,
    productById: state => id => state.products.find(product => product.id === parseInt(id)),
    cartItems: state => state.cart,
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    cartItemCount: state => {
      return state.cart.reduce((count, item) => count + item.quantity, 0)
    },
    checkoutItems: state => state.checkout.items,
    customerInfo: state => state.checkout.customerInfo
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_TO_CART(state, { product, quantity }) {
      const existingItem = state.cart.find(item => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.cart.push({
          ...product,
          quantity
        })
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    UPDATE_CART_ITEM_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    SET_CHECKOUT_ITEMS(state, items) {
      state.checkout.items = items
    },
    SET_CUSTOMER_INFO(state, info) {
      state.checkout.customerInfo = info
    },
    RESET_CHECKOUT(state) {
      state.checkout = {
        items: [],
        customerInfo: {
          name: '',
          phone: '',
          address: '',
          city: '',
          paymentMethod: 'easypaisa'
        }
      }
    }
  },
  actions: {
    initializeStore({ commit }) {
      commit('SET_PRODUCTS', productsData)
    },
    addToCart({ commit }, { product, quantity = 1 }) {
      commit('ADD_TO_CART', { product, quantity })
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    updateCartItemQuantity({ commit }, { productId, quantity }) {
      commit('UPDATE_CART_ITEM_QUANTITY', { productId, quantity })
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
    prepareCheckout({ commit, state }) {
      commit('SET_CHECKOUT_ITEMS', [...state.cart])
    },
    submitCustomerInfo({ commit }, info) {
      commit('SET_CUSTOMER_INFO', info)
    },
    completeCheckout({ commit }) {
      // Here you would typically make an API call to process the order
      commit('CLEAR_CART')
      commit('RESET_CHECKOUT')
    }
  }
})
