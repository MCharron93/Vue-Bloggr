<template>
  <div class="ActiveBlog col-12 text-center p-4">
    <h2>{{ blog.title }}</h2><span v-if="blog.creatorEmail"><button class="btn btn-danger" @click="removeBlog">&times;</button><button class="btn btn-success">Edit?</button></span>
    <p class="p-4">
      {{ blog.body }}
    </p>
    <form class="form-group d-flex justify-content-around" @submit.prevent="addComment">
      <input type="text" name="comment" placeholder="Add comment?" v-model="state.newComment.body">
      <button class="btn btn-info" type="submit">
        &#43;
      </button>
    </form>
    <div class="row">
      <comment-component v-for="comment in comments" :key="comment" :comment-props="comment" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
// There is a huge difference between useRouteR and useRoutE
import { useRoute } from 'vue-router'
import CommentComponent from '../components/CommentComponent'
import router from '../router'
export default {
  name: 'ActiveBlog',
  setup() {
    const route = useRoute()
    const state = reactive({
      newComment: {
        blog: route.params.blogId
      }
    })
    onMounted(() => {
      blogService.setActiveBlog(route.params.blogId)
    })
    return {
      state,
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      removeBlog() {
        blogService.removeBlog(route.params.blogId)
        router.push({ name: 'Home' })
      },
      addComment() {
        blogService.addComment(state.newComment)
      }
    }
  },
  components: { CommentComponent }
}
</script>

<style lang="scss" scoped>

</style>
