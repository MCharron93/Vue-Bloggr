<template>
  <div class="BlogComponent col-5 card parchment p-3 m-3" v-if="blogProp.creatorEmail">
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
.parchment{
 opacity: 70%;
 background-color: tan;
}
</style>
