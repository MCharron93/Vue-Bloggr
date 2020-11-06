<template>
  <div class="BlogComponent col-12 p-2">
    <router-link :to="{ name: 'Blog'}">
      <h2>{{ blogProp.title }}</h2>
      <h4>{{ blogProp.creator.name }}</h4>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
// import { AppState } from '../AppState'
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
