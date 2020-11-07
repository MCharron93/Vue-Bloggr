<template>
  <div class="BlogComponent col-12 p-2" v-if="blogProp.creatorEmail">
    <router-link :to="{ name: 'Blog', params: {blogId: blogProp._id}}">
      <h2>{{ blogProp.title }}</h2>
      <h4>{{ blogProp.creatorEmail }}</h4>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'BlogComponent',
  props: {
    blogProp: Object
  },
  setup(props) {
    return {
      blog: computed(() => props.blogProp)
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>

</style>
