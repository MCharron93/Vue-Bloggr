<template>
  <div class="about text-center" v-if="profile">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <div class="row">
      <blog-component v-for="blog in myBlogs" :key="blog" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import { blogService } from '../services/BlogService'
import BlogComponent from '../components/BlogComponent'
export default {
  name: 'Profile',
  setup() {
    onMounted(() => profileService.getProfile())
    onMounted(() => blogService.getMyBlogs())
    return {
      profile: computed(() => AppState.profile),
      myBlogs: computed(() => AppState.myBlogs)
    }
  },
  components: { BlogComponent }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
