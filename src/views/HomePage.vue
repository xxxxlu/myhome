<template>
  <div class="home-page">

    <!-- All Products -->
    <section class="featured-collection">
      <div class="container">
        <h2 class="section-title">all</h2>
        <div class="product-grid">
          <product-card
            v-for="product in allProductsList"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from '@/components/products/ProductCard.vue'

export default {
  name: 'HomePage',
  components: {
    ProductCard
  },
  computed: {
    ...mapGetters(['allProducts']),
    allProductsList() {
      return this.allProducts
    }
  },
  created() {
    this.$store.dispatch('initializeStore')
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 60px;
}

.hero-banner {
  width: 100%;
  margin-bottom: 40px;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.featured-collection {
  margin-bottom: 50px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background-color: #333;
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.view-all {
  text-align: center;
  margin-top: 30px;

  .view-all-link {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    padding: 5px 0;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #333;
      transform: scaleX(0.3);
      transform-origin: center;
      transition: transform 0.3s ease;
    }

    &:hover:after {
      transform: scaleX(1);
    }
  }
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
