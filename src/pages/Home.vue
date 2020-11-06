<template>
  <div class="home container-fluid">
    <div class="row">
      <h1 class="col-12 text-center">
        Hello Nerds!
      </h1>
      <!-- this page will need to load all of the blogs here -->
      <!-- requires a blogs component to model and load into -->
      <blog-component v-for="blog in blogs" :key="blog" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import BlogComponent from '../components/BlogComponent'
export default {
  name: 'Home',
  setup() {
    // requires a way to call to the api for the blogs to load into app state
    onMounted(() => {
      blogService.getAllBlogs()
    })
    return {
      // call for blogs being loaded into app state to display on page, ties the custom tag to individual items being loaded
      blogs: computed(() => AppState.blogs)
    }
  },
  // component tied into both the import for component vue
  components: { BlogComponent }
}
</script>
