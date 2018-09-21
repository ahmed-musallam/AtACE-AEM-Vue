<template>
  <div class="empty" >
      <div class="empty-icon">
        <i class="icon icon-people"></i>
      </div>
      <p class="empty-title h5">{{title}}</p>
      <p class="empty-subtitle">{{subtitle}}</p>
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
    resourceType: "/apps/vue-app/dialogs/empty",
    jcrPath: "/empty"
  }),
  methods: {
    update(data){
      this.subtitle = data.noResultText
      this.title = data.noResultTitle
    }
  }
}
</script>
