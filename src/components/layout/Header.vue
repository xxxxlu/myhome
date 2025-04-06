<template>
  <header class="site-header">
    <div class="announcement-bar">
      <router-link to="/collections/all-duvets" class="announcement-text">
        RAMADAN KAREEM SALE: Get Upto 75% Off - Limited Time Offer - Hurry Up! Now
      </router-link>
    </div>

    <div class="header-main">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="logo">
            <img src="../../assets/loopm.png" alt="loopm">
          </router-link>

          <nav class="main-nav">
            <ul class="nav-list">
              <li class="nav-item"><router-link to="/">Home</router-link></li>
            </ul>
          </nav>

          <div class="header-actions">
            <button class="search-btn">
              <i class="icon-search">🔍</i>
            </button>
            <router-link to="/cart" class="cart-btn">
              <i class="icon-cart">🛒</i>
              <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComponent',
  data() {
    return {
      activeDropdown: null
    }
  },
  computed: {
    ...mapGetters(['cartItemCount'])
  },
  methods: {
    toggleDropdown(name) {
      this.activeDropdown = this.activeDropdown === name ? null : name
    }
  }
}
</script>

<style lang="scss" scoped>
.site-header {
  width: 100%;
}

.announcement-bar {
  background-color: #f5f5f5;
  text-align: center;
  padding: 10px 0;

  .announcement-text {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    text-decoration: none;
  }
}

.header-main {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: block;
  width: 150px;

  img {
    width: 100%;
    height: auto;
  }
}

.main-nav {
  flex-grow: 1;
  margin: 0 30px;

  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-item {
    margin-right: 20px;
    position: relative;

    a {
      text-decoration: none;
      color: #333;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: #000;
      }
    }

    .dropdown-icon {
      font-size: 10px;
      margin-left: 5px;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;

  button, a {
    background: none;
    border: none;
    margin-left: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333;
    font-size: 14px;

    i {
      margin-right: 5px;
    }
  }

  .cart-btn {
    position: relative;

    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: #e31837;
      color: #fff;
      font-size: 10px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
