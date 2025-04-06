<template>
  <div class="checkout-success-page">
    <div class="container">
      <div class="checkout-header">
        <h1 class="page-title">Checkout</h1>
        <div class="checkout-steps">
          <div class="step completed">
            <span class="step-number">1</span>
            <span class="step-name">Cart</span>
          </div>
          <div class="step-divider"></div>
          <div class="step completed">
            <span class="step-number">2</span>
            <span class="step-name">Information</span>
          </div>
          <div class="step-divider"></div>
          <div class="step active">
            <span class="step-number">3</span>
            <span class="step-name">Success</span>
          </div>
        </div>
      </div>

      <div class="success-content">
        <div class="success-icon">
          <span class="icon">✓</span>
        </div>
        <h2 class="success-title">Thank you for your order!</h2>
        <p class="order-number">Order #: {{ generateOrderNumber() }}</p>
        <p class="success-message">
          Your order has been received and is now being processed.
          We will send you an email confirmation with your order details shortly.
        </p>

        <div class="success-actions">
          <router-link to="/" class="continue-shopping-btn">
            Continue Shopping
          </router-link>
          <button class="print-receipt-btn" @click="printReceipt">
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutSuccess',
  methods: {
    generateOrderNumber() {
      // Generate a random order number
      const prefix = 'MHS'
      const timestamp = new Date().getTime().toString().slice(-8)
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      return `${prefix}-${timestamp}-${random}`
    },
    printReceipt() {
      window.print()
    }
  },
  created() {
    // If user refreshes the page, redirect to home
    // In a real app, we would check if there's an actual order that was just placed
    // We'll use a flag in sessionStorage to determine if an order was just placed
    const orderJustPlaced = sessionStorage.getItem('orderJustPlaced')
    
    if (orderJustPlaced) {
      // Clear the flag after using it
      sessionStorage.removeItem('orderJustPlaced')
    } else {
      // If no order was just placed, redirect to home
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-success-page {
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

.success-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.success-icon {
  margin-bottom: 20px;

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background-color: #4caf50;
    color: #fff;
    border-radius: 50%;
    font-size: 40px;
  }
}

.success-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.order-number {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #666;
}

.success-message {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
}

.success-actions {
  display: flex;
  justify-content: center;
  gap: 20px;

  .continue-shopping-btn, .print-receipt-btn {
    padding: 12px 20px;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }

  .continue-shopping-btn {
    background-color: #242b33;
    color: #fff;

    &:hover {
      background-color: #333;
    }
  }

  .print-receipt-btn {
    background-color: #f5f5f5;
    color: #333;

    &:hover {
      background-color: #e5e5e5;
    }
  }
}

@media (max-width: 576px) {
  .success-actions {
    flex-direction: column;
    gap: 10px;
  }
}

@media print {
  .checkout-header, .success-actions {
    display: none;
  }

  .success-content {
    box-shadow: none;
    padding: 0;
  }
}
</style>
