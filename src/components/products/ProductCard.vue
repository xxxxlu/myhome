<template>
  <div class="product-card">
    <div class="product-image">
      <router-link :to="`/product/${product.id}`">
        <img :src="product.image" :alt="product.name">
      </router-link>
      <div class="sale-tag" v-if="product.price < product.originalPrice">Sale</div>
    </div>

    <div class="product-info">
      <router-link :to="`/product/${product.id}`" class="product-title">
        <h3>{{ product.name }}</h3>
      </router-link>

      <div class="product-rating" v-if="product.rating">
        <span class="stars">
          <i v-for="n in 5" :key="n" class="star" :class="{'filled': n <= product.rating}">★</i>
        </span>
      </div>

      <div class="product-price">
        <span class="current-price">Rs.{{ formatPrice(product.price) }}  </span>
        <span class="original-price" v-if="product.price < product.originalPrice">Rs.{{ formatPrice(product.originalPrice) }}  </span>
      </div>

      <div class="product-actions">
        <button class="add-to-cart-btn" @click="addToCart">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString()
    },
    addToCart() {
      this.$store.dispatch('addToCart', {
        product: this.product,
        quantity: 1
      })

      // Show the added to cart notification
      this.$nextTick(() => {
        alert(`${this.product.name} added to cart!`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.product-image {
  position: relative;
  padding-top: 100%; // 1:1 Aspect ratio
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .sale-tag {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #e31837;
    color: #fff;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 3px;
  }
}

.product-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  margin-bottom: 10px;
  text-decoration: none;
  color: inherit;

  h3 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.product-rating {
  margin-bottom: 10px;

  .stars {
    display: flex;

    .star {
      color: #ddd;
      font-size: 14px;

      &.filled {
        color: #ffc107;
      }
    }
  }
}

.product-price {
  margin-bottom: 15px;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;

  .current-price {
    font-size: 16px;
    font-weight: 600;
    color: #e31837;
  }

  .original-price {
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
    margin-left: 10px;
  }
}

.product-actions {
  margin-top: auto;

  .add-to-cart-btn {
    width: 100%;
    padding: 8px 15px;
    background-color: #242b33;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #333;
    }
  }
}
</style>
