<template>
  <div class="checkout-page">
    <div class="container">
      <div class="checkout-header">
        <h1 class="page-title">Checkout</h1>
        <div class="checkout-steps">
          <div class="step completed">
            <span class="step-number">1</span>
            <span class="step-name">Cart</span>
          </div>
          <div class="step-divider"></div>
          <div class="step active">
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
        <div class="checkout-form-container">
          <div class="checkout-form">
            <h2 class="section-title">Contact Information</h2>
            <form @submit.prevent="submitOrder">
              <div class="form-group">
                <label for="name">Full Name <span class="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  v-model="customerInfo.name"
                  required
                  placeholder="Enter your full name"
                >
              </div>

              <div class="form-group">
                <label for="phone">Phone Number <span class="required">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  v-model="customerInfo.phone"
                  required
                  placeholder="Enter your phone number"
                >
              </div>

              <div class="form-group">
                <label for="address">Address <span class="required">*</span></label>
                <textarea
                  id="address"
                  v-model="customerInfo.address"
                  required
                  placeholder="Enter your complete address"
                  rows="3"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="city">City <span class="required">*</span></label>
                <input
                  type="text"
                  id="city"
                  v-model="customerInfo.city"
                  required
                  placeholder="Enter your city"
                >
              </div>

              <h2 class="section-title payment-title">Payment Method</h2>

              <div class="payment-methods">
                <div class="payment-method">
                  <input
                    type="radio"
                    id="cash_on_delivery"
                    value="cash_on_delivery"
                    v-model="customerInfo.paymentMethod"
                    checked
                  >
                  <label for="cash_on_delivery">easypaisa</label>
                  <img src="../../assets/easypaisa.png" alt="" style="width: 100px;height: 70px;">
                </div>

                <div class="payment-method">
                  <input
                    type="radio"
                    id="bank_transfer"
                    value="bank_transfer"
                    v-model="customerInfo.paymentMethod"
                  >
                  <label for="bank_transfer">Frame</label>
                  <img src="../../assets/Frame.png" alt="" style="width: 100px;height: 70px;">
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="submit-btn">
                  Place Order
                </button>
                <button type="button" class="back-btn" @click="goBack">
                  Go Back
                </button>
              </div>
            </form>
          </div>

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
  name: 'CheckoutInformation',
  data() {
    return {
      customerInfo: {
        name: '',
        phone: '',
        address: '',
        city: '',
        paymentMethod: 'easypaisa'
      }
    }
  },
  computed: {
    ...mapGetters(['checkoutItems', 'cartTotal', 'customerInfo'])
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString()
    },
    goBack() {
      this.$router.push('/checkout')
    },
    submitOrder() {
      // Submit customer information
      this.$store.dispatch('submitCustomerInfo', this.customerInfo)

      // Set a flag in sessionStorage to indicate an order was just placed
      sessionStorage.setItem('orderJustPlaced', 'true')
      
      // Complete the checkout
      this.$store.dispatch('completeCheckout')

      // Redirect to success page
      this.$router.push('/checkout/success')
    }
  },
  created() {
    // If there are no items in checkout session (e.g., direct page access),
    // redirect to cart
    if (!this.checkoutItems.length) {
      this.$router.push('/cart')
    }

    // Pre-fill fields if customer info exists
    if (this.customerInfo) {
      this.customerInfo = { ...this.customerInfo }
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

  &.completed {
    .step-number {
      background-color: #4caf50;
      color: #fff;
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
  max-width: 1000px;
  margin: 0 auto;
}

.checkout-form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;

  &.payment-title {
    margin-top: 30px;
  }
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;

    .required {
      color: #e31837;
    }
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #aaa;
    }
  }
}

.payment-methods {
  margin-bottom: 30px;
}

.payment-method {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }

  label {
    font-size: 14px;
  }
}

.form-actions {
  display: flex;
  justify-content: space-between;

  button {
    padding: 12px 20px;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-btn {
    background-color: #e31837;
    color: #fff;

    &:hover {
      background-color: #c01631;
    }
  }

  .back-btn {
    background-color: #f5f5f5;
    color: #333;

    &:hover {
      background-color: #e5e5e5;
    }
  }
}

.checkout-items {
  margin-bottom: 30px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
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
  padding-top: 20px;
  border-top: 1px solid #eee;
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

@media (max-width: 768px) {
  .checkout-form-container {
    grid-template-columns: 1fr;
  }

  .checkout-summary {
    order: -1;
    margin-bottom: 30px;
  }
}
</style>
