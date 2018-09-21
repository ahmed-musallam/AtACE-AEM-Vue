<template>
  <ul class="pagination" v-if="length">
    <li 
        class="page-item"
        v-for="(page, index) in pages"
        :key="index"
        :class="{active: page}">
      <a tabindex="-1" @click="$emit('selection', index)">{{index+1}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    length: Number,
    pages: Array
  }
}
</script>

