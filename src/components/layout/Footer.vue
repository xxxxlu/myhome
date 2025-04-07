<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-heading">Subscribe to our emails</h3>
          <form class="newsletter-form" @submit.prevent="submitNewsletter">
            <input type="email" v-model="email" placeholder="Email" required>
            <button type="submit" class="submit-btn">→</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="payment-methods">
          <p>Payment methods</p>
          <img src="../../assets/easypaisa.png" alt="" style="width: 100px;height: 80px;">
          <img src="../../assets/Frame.png" alt="" style="width: 100px;height: 80px;">
        </div>
        <div class="copyright">
          <p>Copyright © {{ new Date().getFullYear() }} | Powered by Data Network Solutions (SMC-Private) Limited</p>
        </div>
      </div>
    </div>

    <div class="whatsapp-order">
      <div class="order-form-popup">
        <p>Please fill in the form to order<span class="underscore">_</span></p>
        <form class="whatsapp-form" @submit.prevent="submitWhatsappOrder">
          <div class="form-row">
            <input type="text" v-model="whatsappForm.name" placeholder="Full Name *" required>
          </div>
          <div class="form-row">
            <input type="tel" v-model="whatsappForm.phone" placeholder="Phone *" required>
          </div>
          <div class="form-row">
            <input type="text" v-model="whatsappForm.address" placeholder="Address *" required>
          </div>
          <div class="form-row">
            <input type="text" v-model="whatsappForm.city" placeholder="City *" required>
          </div>
        </form>
        <button class="whatsapp-btn">
          Order on Whatsapp<i class="whatsapp-icon">📱</i>
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      email: '',
      whatsappForm: {
        name: '',
        phone: '',
        address: '',
        city: ''
      }
    }
  },
  methods: {
    submitNewsletter() {
      // Implementation for newsletter signup
      alert('Thank you for subscribing to our newsletter!')
      this.email = ''
    },
    submitWhatsappOrder() {
      // Implementation for WhatsApp order
      const message = `New order from ${this.whatsappForm.name}. Contact: ${this.whatsappForm.phone}. Address: ${this.whatsappForm.address}, ${this.whatsappForm.city}`
      console.log('WhatsApp order:', message)
      // Reset form
      this.whatsappForm = {
        name: '',
        phone: '',
        address: '',
        city: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.site-footer {
  background-color: #242b33;
  color: #fff;
  padding: 60px 0 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.footer-heading {
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 600;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;

    a {
      color: #888;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;

      &:hover {
        color: #fff;
      }
    }
  }
}

.newsletter-form {
  display: flex;
  margin-top: 15px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #444;
    background-color: transparent;
    color: #fff;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #666;
    }
  }

  .submit-btn {
    padding: 0 15px;
    background-color: transparent;
    border: 1px solid #444;
    border-left: none;
    color: #fff;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid #444;

  .payment-methods {
    margin-bottom: 15px;

    p {
      font-size: 14px;
      color: #888;
    }
  }

  .copyright {
    margin-bottom: 15px;

    p {
      font-size: 14px;
      color: #888;

      a {
        color: #888;
        text-decoration: none;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}

.policy-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;

  li {
    margin: 0 10px;

    a {
      color: #888;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;

      &:hover {
        color: #fff;
      }
    }
  }
}

.whatsapp-order {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.order-form-popup {
  background-color: #fff;
  color: #333;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 250px;
  display: none;

  p {
    margin: 0 0 10px;
    font-size: 14px;

    .underscore {
      color: #e31837;
    }
  }

  .form-row {
    margin-bottom: 10px;

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 3px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: #aaa;
      }
    }
  }
}

.whatsapp-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25d366;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .whatsapp-icon {
    margin-left: 5px;
  }

  &:hover {
    background-color: #22c55e;
  }
}
</style>
