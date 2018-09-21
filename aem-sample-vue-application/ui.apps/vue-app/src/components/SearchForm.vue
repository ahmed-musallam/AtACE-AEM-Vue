<template>
  <form class="form-group m-2" v-on:submit.prevent>
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
    <button class="btn btn-primary form-inline" @click="$emit('search', '', {query, inStock})">{{searchText}}</button>
  </form>
</template>
<script>
export default {
  name: 'SearchForm',
  props: {},
  data() {
    return {
        searchText: "Search",
        query: "",
        inStock: "",
        resourceType: "/apps/vue-app/dialogs/search-form",
        jcrPath: "/search-form"
    }
  },
  methods: {
    update(data){
      this.searchText = data.searchText
    }
  }
}
</script>

<style>
.form-input {
  vertical-align: middle;
}
</style>


