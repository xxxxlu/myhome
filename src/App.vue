<template>
  <div id="app">
    <header-component />
    <main>
      <router-view />
    </main>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from '@/components/layout/Header.vue'
import FooterComponent from '@/components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Muli', Arial, sans-serif;
  color: #333;
  line-height: 1.5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
}

ul {
  list-style: none;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
