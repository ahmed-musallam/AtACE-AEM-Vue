<template>
    <div>
      <div class="tile m-2 p-2 product-result">
        <div class="product-price tile-icon bg-primary text-light s-circle centered">
          <span>$</span>{{doc.price}}
        </div>
        <div class="tile-content">
          <p class="tile-title"><span class="text-bold">{{doc.name}}</span></p>
          <p class="tile-subtitle text-gray">
            <span class="chip bg-primary">{{doc.inStock ? "in stock" : "out of stock"}}</span>
            <br/>
            Categories: <span class="chip" v-for="(catItem, index) in doc.cat" :key="index">{{catItem}}</span>
          </p>
          <button class="btn btn-primary m-1">Buy</button><button class="btn m-1">More Options</button>
        </div>
      </div>
      <div class="divider"></div>
    </div>
</template>
<script>
export default {
  name: 'Result',
  props: {
    doc: Object
  },
  data() {
    return {}
  },
  methods: {

  }
}
</script>

<style>
.product-price {
  width: 4em;
  height: 4em;
  line-height: 4em;
  text-align: center;
}
.product-result {
  border-left: 0.25em solid #5755d9
}
</style>

