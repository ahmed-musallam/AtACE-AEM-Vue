<template>
  <div id="app">
    <SearchProducts/>
  </div>
</template>

<script>
import SearchProducts from './components/SearchProducts.vue'
require('spectre.css')
require('./assets/style.css')

export default {
  name: 'app',
  components: {
    SearchProducts
  }
}
</script>
