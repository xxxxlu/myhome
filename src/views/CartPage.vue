<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title">Your cart</h1>

      <div class="cart-content" v-if="cartItems.length">
        <div class="cart-items">
          <div class="cart-header">
            <div class="col-product">Product</div>
            <div class="col-price">Price</div>
            <div class="col-quantity">Quantity</div>
            <div class="col-total">Total</div>
          </div>

          <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <div class="col-product">
              <div class="product-details">
                <div class="product-image">
                  <router-link :to="`/product/${item.id}`">
                    <img :src="item.image" :alt="item.name">
                  </router-link>
                </div>
                <div class="product-info">
                  <router-link :to="`/product/${item.id}`" class="product-name">
                    {{ item.name }}
                  </router-link>
                </div>
              </div>
            </div>

            <div class="col-price">
              <span class="price">Rs.{{ formatPrice(item.price) }}  </span>
            </div>

            <div class="col-quantity">
              <div class="quantity-selector">
                <button class="quantity-btn" @click="decreaseQuantity(item.id)">-</button>
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  :max="item.stock"
                  @change="updateCartItemQuantity(item.id, item.quantity)"
                >
                <button class="quantity-btn" @click="increaseQuantity(item.id, item.stock)">+</button>
              </div>
              <button class="remove-btn" @click="removeFromCart(item.id)">Remove</button>
            </div>

            <div class="col-total">
              <span class="total-price">Rs.{{ formatPrice(item.price * item.quantity) }}  </span>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <h2 class="summary-title">Order summary</h2>

          <div class="summary-row">
            <span class="summary-label">Subtotal</span>
            <span class="summary-value">Rs.{{ formatPrice(cartTotal) }}  </span>
          </div>

          <div class="summary-row">
            <span class="summary-label">Shipping</span>
            <span class="summary-value">Calculated at checkout</span>
          </div>

          <div class="summary-row total">
            <span class="summary-label">Total</span>
            <span class="summary-value">Rs.{{ formatPrice(cartTotal) }}  </span>
          </div>

          <div class="checkout-buttons">
            <button class="checkout-btn" @click="proceedToCheckout">
              Check out
            </button>
            <router-link to="/" class="continue-shopping">
              Continue shopping
            </router-link>
          </div>
        </div>
      </div>

      <div class="empty-cart" v-else>
        <p>Your cart is empty</p>
        <router-link to="/" class="continue-shopping-btn">
          Continue shopping
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartPage',
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString()
    },
    removeFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId)
    },
    decreaseQuantity(productId) {
      const item = this.cartItems.find(item => item.id === productId)
      if (item && item.quantity > 1) {
        this.$store.dispatch('updateCartItemQuantity', {
          productId,
          quantity: item.quantity - 1
        })
      } else {
        // If quantity would become 0, remove the item instead
        this.removeFromCart(productId)
      }
    },
    increaseQuantity(productId, stock) {
      const item = this.cartItems.find(item => item.id === productId)
      if (item && item.quantity < stock) {
        this.$store.dispatch('updateCartItemQuantity', {
          productId,
          quantity: item.quantity + 1
        })
      }
    },
    updateCartItemQuantity(productId, quantity) {
      if (quantity <= 0) {
        this.removeFromCart(productId)
        return
      }

      this.$store.dispatch('updateCartItemQuantity', {
        productId,
        quantity: Math.min(quantity, this.cartItems.find(item => item.id === productId).stock)
      })
    },
    proceedToCheckout() {
      // Prepare checkout session
      this.$store.dispatch('prepareCheckout')
      this.$router.push('/checkout')
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
  padding: 40px 0;
}

.page-title {
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 500;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 14px;
}

.cart-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.product-details {
  display: flex;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.product-name {
  font-size: 14px;
  text-decoration: none;
  color: #333;

  &:hover {
    color: #e31837;
  }
}

.col-price, .col-total {
  display: flex;
  align-items: center;

  .price, .total-price {
    font-size: 14px;
  }
}

.col-quantity {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  max-width: 100px;
  margin-bottom: 10px;

  input {
    width: 40px;
    text-align: center;
    padding: 5px 0;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    font-size: 14px;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .quantity-btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    font-size: 14px;
    cursor: pointer;

    &:first-child {
      border-radius: 3px 0 0 3px;
    }

    &:last-child {
      border-radius: 0 3px 3px 0;
    }

    &:hover {
      background-color: #e5e5e5;
    }
  }
}

.remove-btn {
  border: none;
  background: none;
  color: #999;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #e31837;
  }
}

.cart-summary {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  height: fit-content;
}

.summary-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  .summary-label {
    font-size: 14px;
    color: #666;
  }

  .summary-value {
    font-size: 14px;
    font-weight: 500;
  }

  &.total {
    border-top: 1px solid #eee;
    padding-top: 15px;
    margin-top: 15px;

    .summary-label, .summary-value {
      font-size: 16px;
      font-weight: 600;
    }
  }
}

.checkout-buttons {
  margin-top: 20px;

  .checkout-btn {
    width: 100%;
    padding: 12px 0;
    background-color: #e31837;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;

    &:hover {
      background-color: #c01631;
    }
  }

  .continue-shopping {
    display: block;
    text-align: center;
    color: #333;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
}

.empty-cart {
  text-align: center;
  padding: 50px 0;

  p {
    font-size: 18px;
    margin-bottom: 20px;
    color: #666;
  }

  .continue-shopping-btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #242b33;
    color: #fff;
    text-decoration: none;
    border-radius: 3px;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #333;
    }
  }
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-header {
    grid-template-columns: 2fr 1fr 1fr;

    .col-price {
      display: none;
    }
  }

  .cart-item {
    grid-template-columns: 2fr 1fr 1fr;

    .col-price {
      display: none;
    }
  }
}

@media (max-width: 576px) {
  .cart-header {
    display: none;
  }

  .cart-item {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .product-details {
    margin-bottom: 10px;
  }

  .col-price, .col-quantity, .col-total {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::before {
      content: attr(data-label);
      font-weight: 500;
    }
  }
}
</style>
