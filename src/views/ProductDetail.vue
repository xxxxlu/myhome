<template>
  <div class="product-detail-page" v-if="product">
    <div class="container">
      <div class="breadcrumbs">
        <router-link to="/">Home</router-link> /
        <router-link :to="`/category/${product.category.toLowerCase().replace(/ /g, '-')}`">{{ product.category }}</router-link> /
        <span>{{ product.name }}</span>
      </div>

      <div class="product-details">
        <div class="product-image-gallery">
          <div class="main-image">
            <img :src="product.image" :alt="product.name">
          </div>
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>

          <div class="product-rating" v-if="product.rating">
            <span class="stars">
              <i v-for="n in 5" :key="n" class="star" :class="{'filled': n <= product.rating}">★</i>
            </span>
            <span class="rating-text">({{ product.rating }} rating)</span>
          </div>

          <div class="product-price">
            <span class="current-price">Rs.{{ formatPrice(product.price) }}  </span>
            <span class="original-price" v-if="product.price < product.originalPrice">
              Regular price Rs.{{ formatPrice(product.originalPrice) }}  
            </span>
            <span class="sale-label" v-if="product.price < product.originalPrice">Sale</span>
          </div>

          <div class="shipping-info">
            <span>Shipping calculated at checkout.</span>
          </div>

          <div class="product-options" v-if="product.sizes && product.sizes.length">
            <div class="option-group">
              <label for="size">Size</label>
              <select id="size" v-model="selectedSize" class="option-select">
                <option v-for="size in product.sizes" :key="size" :value="size">{{ size }}</option>
              </select>
            </div>
          </div>

          <div class="product-options" v-if="product.pieces && product.pieces.length">
            <div class="option-group">
              <label for="pieces">Pieces</label>
              <select id="pieces" v-model="selectedPieces" class="option-select">
                <option v-for="piece in product.pieces" :key="piece" :value="piece">{{ piece }}</option>
              </select>
            </div>
          </div>

          <div class="quantity-selector">
            <label for="quantity">Quantity</label>
            <div class="quantity-input">
              <button class="quantity-btn" @click="decreaseQuantity">-</button>
              <input
                type="number"
                id="quantity"
                v-model.number="quantity"
                min="1"
                :max="product.stock"
              >
              <button class="quantity-btn" @click="increaseQuantity">+</button>
            </div>
          </div>

          <div class="product-actions">
            <button
              class="add-to-cart-btn"
              @click="addToCart"
              :disabled="!isAvailable"
            >
              {{ isAvailable ? 'Add to cart' : 'Sold out' }}
            </button>
            <button class="buy-now-btn" @click="buyNow" :disabled="!isAvailable">Buy it now</button>
          </div>

          <div class="product-description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="product-not-found" v-else>
    <div class="container">
      <h2>Product not found</h2>
      <p>The product you are looking for does not exist.</p>
      <router-link to="/" class="back-home-btn">Back to home</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductDetail',
  data() {
    return {
      quantity: 1,
      selectedSize: '',
      selectedPieces: ''
    }
  },
  computed: {
    ...mapGetters(['productById']),
    productId() {
      return this.$route.params.id
    },
    product() {
      return this.productById(this.productId)
    },
    isAvailable() {
      return this.product && this.product.stock > 0
    }
  },
  watch: {
    product: {
      immediate: true,
      handler(newProduct) {
        if (newProduct) {
          if (newProduct.sizes && newProduct.sizes.length) {
            this.selectedSize = newProduct.sizes[0]
          }
          if (newProduct.pieces && newProduct.pieces.length) {
            this.selectedPieces = newProduct.pieces[0]
          }
        }
      }
    }
  },
  created() {
    // Make sure the store is initialized
    if (!this.product) {
      this.$store.dispatch('initializeStore')
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString()
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++
      }
    },
    addToCart() {
      if (!this.isAvailable) return

      this.$store.dispatch('addToCart', {
        product: this.product,
        quantity: this.quantity
      })

      // Show the added to cart notification
      this.$nextTick(() => {
        alert(`${this.product.name} added to cart!`)
      })
    },
    buyNow() {
      if (!this.isAvailable) return

      this.addToCart()
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="scss" scoped>
.product-detail-page {
  padding: 40px 0;
}

.breadcrumbs {
  margin-bottom: 30px;
  font-size: 14px;

  a {
    color: #666;
    text-decoration: none;

    &:hover {
      color: #000;
    }
  }

  span {
    color: #999;
  }
}

.product-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.main-image {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.product-title {
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: 500;
}

.product-rating {
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  .stars {
    display: flex;

    .star {
      color: #ddd;
      font-size: 16px;

      &.filled {
        color: #ffc107;
      }
    }
  }

  .rating-text {
    margin-left: 10px;
    font-size: 14px;
    color: #666;
  }
}

.product-price {
  margin-bottom: 20px;

  .current-price {
    font-size: 24px;
    font-weight: 600;
    color: #e31837;
  }

  .original-price {
    display: block;
    font-size: 14px;
    color: #999;
    margin-top: 5px;
  }

  .sale-label {
    display: inline-block;
    background-color: #e31837;
    color: #fff;
    padding: 3px 8px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 3px;
    margin-left: 10px;
    vertical-align: middle;
  }
}

.shipping-info {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.product-options {
  margin-bottom: 20px;

  .option-group {
    margin-bottom: 15px;

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .option-select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      font-size: 14px;
      background-color: #fff;

      &:focus {
        outline: none;
        border-color: #aaa;
      }
    }
  }
}

.quantity-selector {
  margin-bottom: 30px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .quantity-input {
    display: flex;
    align-items: center;
    max-width: 120px;

    input {
      width: 50px;
      text-align: center;
      padding: 8px 0;
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
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      font-size: 16px;
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
}

.product-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 30px;

  button {
    padding: 12px 15px;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .add-to-cart-btn {
    background-color: #242b33;
    color: #fff;

    &:hover:not(:disabled) {
      background-color: #333;
    }
  }

  .buy-now-btn {
    background-color: #e31837;
    color: #fff;

    &:hover:not(:disabled) {
      background-color: #c01631;
    }
  }
}

.product-description {
  margin-top: 30px;

  h3 {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    color: #666;
  }
}

.product-not-found {
  padding: 80px 0;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
  }

  .back-home-btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #242b33;
    color: #fff;
    text-decoration: none;
    border-radius: 3px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #333;
    }
  }
}

@media (max-width: 768px) {
  .product-details {
    grid-template-columns: 1fr;
  }
}
</style>
