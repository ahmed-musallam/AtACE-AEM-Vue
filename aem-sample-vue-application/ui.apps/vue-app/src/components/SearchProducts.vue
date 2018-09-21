<template>
  <div class="container">
    <h2>Search</h2>
    <SearchForm @search="search"/>
    <!--/* Pagination */-->
    <Pagination :pages="pages" :length="pages.length" @selection="search"></Pagination>
    <!-- SEARCH RESULTS-->
    <template v-for="(doc, index) in docs" >
      <Result :doc="doc" :key="index"/>
    </template>
    <!--/* EMPTY STATE*/-->
    <Empty title="sad ;(" subtitle="nothin' to see here" v-if="!docs || !docs.length"></Empty>
  </div>
</template>

<script>
import Empty from "./Empty.vue"
import Pagination from "./Pagination.vue"
import SearchForm from "./SearchForm.vue"
import Result from "./Result.vue"

const axios = require('axios');
export default {
  name: 'SearchProducts',
  props: {
    msg: String
  },
  components: {
    Empty,
    Pagination,
    SearchForm,
    Result
  },
  data() {
    return {
      docs: [],
      pages: [],
      formData: {}
    }
  },
  methods: {
    toStringQuery: function (object) {
      let str = '';
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key] || '*';
          str += `${key}:${element}`
        }
      }
      return str;
    },
    getResults: function (pageNum) {
      var filters = {inStock: this.formData.inStock}
      var params = {
        fq: this.toStringQuery(filters),
        q: this.formData.query || '*:*',
        start: pageNum ? pageNum: 0 
      };
      return axios.get('http://localhost:8983/solr/techproducts/select', { params });
    },
    // eslint-disable-next-line
    search: function (pageNum, data) {
      this.formData = data ? data : this.formData
      var that = this;
      this
      .getResults(pageNum)
      .then(function(resp){
        that.docs = resp.data.response.docs;
        var numberOfPages = Math.ceil(resp.data.response.numFound/10); // default page size is 10
        that.pages = new Array(numberOfPages);
        if (that.pages.length) {
          pageNum = pageNum ? pageNum : 0 
          that.pages[pageNum] = true;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 800px;
}
</style>
