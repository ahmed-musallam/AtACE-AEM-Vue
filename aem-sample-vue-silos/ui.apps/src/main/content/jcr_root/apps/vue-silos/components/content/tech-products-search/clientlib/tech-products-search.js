Vue.newInstance('tech-product-search', {
  data: function () {
    return {
      query: '',
      filters: {
        inStock: true,
      },
      docs: [],
      pages: 0
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
      var params = {
        fq: this.toStringQuery(this.filters),
        q: this.query || '*:*',
        start: pageNum ? pageNum : 0
      };
      return axios.get('http://localhost:8982/solr/techproducts/select', { params });
    },
    search: function (pageNum, event) {
      var that = this;
      this
      .getResults(pageNum)
      .then(function(resp){
        that.docs = resp.data.response.docs;
        var numberOfPages = Math.ceil(resp.data.response.numFound/10); // default page size is 10
        that.pages = new Array(numberOfPages);
        that.pages[pageNum] = true;
      })
    }
  }
})