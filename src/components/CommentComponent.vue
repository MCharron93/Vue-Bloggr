<template>
  <div v-if="profile.email" class="commentComponent text-left col-12">
    <h4>{{ comments.body }}</h4>
    <p v-if="comments.creator">
      {{ comments.creator.email }}
    </p>
    <button v-if="comments.creatorEmail == profile.email" class="btn btn-success">
      Edit?
    </button>
    <button class="btn btn-danger" v-if="comments.creatorEmail == profile.email" @click="removeComment">
      &times;
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { blogService } from '../services/BlogService'
import { AppState } from '../AppState'
// import { AppState } from '../AppState'
export default {
  name: 'CommentComponent',
  props: {
    commentProps: Object
  },
  setup(props) {
    // onMounted(() => AppState.comments)
    return {
      profile: computed(() => AppState.profile),
      comments: computed(() => props.commentProps),
      removeComment() {
        blogService.removeComment(props.commentProps._id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
