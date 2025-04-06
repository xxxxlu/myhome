<template>
  <div class="checkout-page">
    <div class="container">
      <div class="checkout-header">
        <h1 class="page-title">Checkout</h1>
        <div class="checkout-steps">
          <div class="step active">
            <span class="step-number">1</span>
            <span class="step-name">Cart</span>
          </div>
          <div class="step-divider"></div>
          <div class="step">
            <span class="step-number">2</span>
            <span class="step-name">Information</span>
          </div>
          <div class="step-divider"></div>
          <div class="step">
            <span class="step-number">3</span>
            <span class="step-name">Success</span>
          </div>
        </div>
      </div>

      <div class="checkout-content" v-if="checkoutItems.length">
        <div class="checkout-summary">
          <h2 class="section-title">Order Summary</h2>

          <div class="checkout-items">
            <div class="checkout-item" v-for="item in checkoutItems" :key="item.id">
              <div class="item-image">
                <img :src="item.image" :alt="item.name">
                <span class="item-quantity">{{ item.quantity }}</span>
              </div>
              <div class="item-details">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-price">Rs.{{ formatPrice(item.price) }}  </p>
              </div>
              <div class="item-total">
                Rs.{{ formatPrice(item.price * item.quantity) }}  
              </div>
            </div>
          </div>

          <div class="checkout-totals">
            <div class="total-row">
              <span class="total-label">Subtotal</span>
              <span class="total-value">Rs.{{ formatPrice(cartTotal) }}  </span>
            </div>
            <div class="total-row">
              <span class="total-label">Shipping</span>
              <span class="total-value">Free</span>
            </div>
            <div class="total-row grand-total">
              <span class="total-label">Total</span>
              <span class="total-value">Rs.{{ formatPrice(cartTotal) }}  </span>
            </div>
          </div>

          <div class="checkout-actions">
            <button class="continue-btn" @click="continueToInformation">
              Continue to Information
            </button>
            <router-link to="/cart" class="return-to-cart">
              Return to cart
            </router-link>
          </div>
        </div>
      </div>

      <div class="empty-checkout" v-else>
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
  name: 'CheckoutCart',
  computed: {
    ...mapGetters(['checkoutItems', 'cartTotal'])
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString()
    },
    continueToInformation() {
      this.$router.push('/checkout/information')
    }
  },
  created() {
    // If there are no items in checkout session (e.g., direct page access),
    // redirect to cart
    if (!this.checkoutItems.length) {
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-page {
  padding: 40px 0;
}

.checkout-header {
  margin-bottom: 30px;
}

.page-title {
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 500;
  text-align: center;
}

.checkout-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;

  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #f5f5f5;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .step-name {
    font-size: 12px;
    color: #666;
  }

  &.active {
    .step-number {
      background-color: #242b33;
      color: #fff;
    }

    .step-name {
      color: #242b33;
      font-weight: 600;
    }
  }
}

.step-divider {
  width: 60px;
  height: 1px;
  background-color: #ddd;
  margin: 0 10px;
}

.checkout-content {
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
}

.checkout-items {
  margin-bottom: 30px;
}

.checkout-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
}

.item-image {
  width: 60px;
  height: 60px;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  margin-right: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-quantity {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #242b33;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
  }
}

.item-details {
  flex-grow: 1;

  .item-name {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .item-price {
    font-size: 12px;
    color: #666;
  }
}

.item-total {
  font-size: 14px;
  font-weight: 500;
}

.checkout-totals {
  margin-bottom: 30px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .total-label {
    font-size: 14px;
    color: #666;
  }

  .total-value {
    font-size: 14px;
    font-weight: 500;
  }

  &.grand-total {
    border-top: 1px solid #eee;
    padding-top: 15px;
    margin-top: 15px;

    .total-label, .total-value {
      font-size: 16px;
      font-weight: 600;
    }
  }
}

.checkout-actions {
  display: flex;
  flex-direction: column;
  align-items: center;

  .continue-btn {
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
    margin-bottom: 15px;

    &:hover {
      background-color: #c01631;
    }
  }

  .return-to-cart {
    color: #333;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
}

.empty-checkout {
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
</style>
