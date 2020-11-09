<template>
  <div class="ActiveBlog col-12 text-center p-4 bg-room">
    <div class="card parchment">
      <h2>{{ blog.title }} </h2><h4>-- {{ blog.creatorEmail }}</h4><span v-if="blog.creatorEmail"><button v-if="profile.email == blog.creatorEmail" type="button" class="btn btn-secondary justify-self-end" data-toggle="modal" data-target="#blogModal">
        Edit
      </button><button v-if="profile.email == blog.creatorEmail" class="btn btn-danger" @click="removeBlog">&times;</button></span>
      <p class="p-4">
        {{ blog.body }}
      </p>
    </div>
    <form @submit.prevent="editBlog">
      <div class="modal" tabindex="-1" role="dialog" id="blogModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <input class="border border-none" type="text" v-model="state.editBlog.title" placeholder="Title">
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
                <textarea class="form-control" aria-label="With textarea" v-model="state.editBlog.body">
                  </textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" id="submitBtn">
                Save changes
              </button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <form class="form-group d-flex justify-content-around" @submit.prevent="addComment">
      <input class="border border-none transparent" type="text" name="comment" placeholder="Add comment?" v-model="state.newComment.body">
      <button class="btn btn-info" type="submit">
        &#43;
      </button>
    </form>
    <div class="row justify-content-around">
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
      },
      editBlog: {
        blogId: route.params.blogId
      }
    })
    onMounted(() => {
      blogService.setActiveBlog(route.params.blogId)
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      removeBlog() {
        blogService.removeBlog(route.params.blogId)
        router.push({ name: 'Home' })
      },
      addComment() {
        blogService.addComment(state.newComment)
      },
      editBlog() {
        blogService.editBlog(state.editBlog)
      }
    }
  },
  components: { CommentComponent }
}
</script>

<style lang="scss" scoped>
.ActiveBlog{
  height: 100vh;
}
.bg-room{
background-image: url('tavern-dark.jpg');
background-size: cover;
background-position: center;
}
.parchment{
//  opacity: 70%;
 background-color: tan;
}

</style>
