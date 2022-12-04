<template>
  <div class="container">
    <AppHeader/>
    <Nuxt />
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue"
export default {
  components: {
    AppHeader
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  background: #f4f4f4;
}

a {
  color: #666;
  text-decoration: none;
}

ul {
  list-style: none;
}

.container {
  max-width: 80vw;
  margin: 2rem auto;
  overflow: hidden;
  /* padding: 1rem 2rem; */
  border-radius: 5px;
  background: #fff;
  max-height: 90vh;
}
</style>
