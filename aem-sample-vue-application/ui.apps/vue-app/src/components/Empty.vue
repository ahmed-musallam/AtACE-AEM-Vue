<template>
  <div class="empty" >
      <div class="empty-icon">
        <i class="icon icon-people"></i>
      </div>
      <p class="empty-title h5">oh no</p>
      <p class="empty-subtitle">nothin</p>
    </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    title: String,
    subtitle: String
  },
  data: () => ({
    resourceType: "/apps/vue-app/components/content/tech-products-search",
    jcrPath: "/content/vue-app/home/sample/jcr:content/tech-products-search/empty"
  }),
}
</script>
