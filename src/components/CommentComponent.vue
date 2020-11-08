<template>
  <div v-if="profile.email" class="commentComponent text-left col-5 p-2">
    <h4>{{ comments.body }}</h4>
    <p v-if="comments.creator">
      {{ comments.creator.email }}
    </p>
    <span>
      <button type="button" v-if="comments.creatorEmail == profile.email" class="btn btn-success" data-toggle="modal" data-target="#commentModal">
        Edit?
      </button>
      <button class="btn btn-danger" v-if="comments.creatorEmail == profile.email" @click="removeComment">
        &times;
      </button></span>

    <form @submit.prevent="editComment">
      <div class="modal" tabindex="-1" role="dialog" id="commentModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Make your edits here!
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">Content</span>
                </div>
                <textarea class="form-control" aria-label="With textarea" v-model="state.editComment.body">
                  </textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" id="submitBtn">
                Save changes
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { blogService } from '../services/BlogService'
import { AppState } from '../AppState'
// import { useRoute } from 'vue-router'
// import { AppState } from '../AppState'
export default {
  name: 'CommentComponent',
  props: {
    commentProps: Object
  },
  setup(props) {
    // const route = useRoute()
    const state = reactive({
      editComment: {
        blog: props.commentProps.blog,
        _id: props.commentProps._id
      }
    })
    // onMounted(() => AppState.comments)
    return {
      state,
      profile: computed(() => AppState.profile),
      comments: computed(() => props.commentProps),
      removeComment() {
        blogService.removeComment(props.commentProps._id, props.commentProps.blog)
      },
      editComment() {
        blogService.editComment(state.editComment)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
