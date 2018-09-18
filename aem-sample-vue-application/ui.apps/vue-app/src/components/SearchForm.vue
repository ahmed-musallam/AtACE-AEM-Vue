<template>
  <form class="form-group m-2">
    <div class="form-inline">
        <input class="form-input form-inline" type="text" placeholder="Text" v-model="query">
    </div>
    <div class="form-inline">
      <select class="form-select" v-model="inStock">
        <option value="">either</option>
        <option value="true">in stock</option>
        <option value="false">out of stock</option>
      </select>
    </div>
    <button class="btn btn-primary form-inline" @click="$emit('search', '', {query, inStock})">search</button>
  </form>
</template>
<script>
export default {
  name: 'SearchForm',
  props: {},
  data() {
    return {
        query: "",
        inStock: ""
    }
  },
  methods: {

  }
}
</script>

<style>
.form-input {
  vertical-align: middle;
}
</style>


