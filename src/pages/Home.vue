<template>
  <div class="home container-fluid">
    <div class="row justify-content-center">
      <h1 class="col-12 text-center">
        Hello Nerds!
      </h1>
      <div>
        <p>Creating a blog is fun and easy! Just click this button to pull up the form!</p>
        <span>
          <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#myModal">
            &#43; Blog
          </button></span>
      </div>

      <form @submit.prevent="createBlog">
        <div class="modal" tabindex="-1" role="dialog" id="myModal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  <input type="text" v-model="state.newBlog.title" placeholder="Blog title:">
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
                  <textarea class="form-control" aria-label="With textarea" v-model="state.newBlog.body">
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

      <!-- this page will need to load all of the blogs here -->
      <!-- requires a blogs component to model and load into -->
      <blog-component v-for="blog in blogs" :key="blog" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import BlogComponent from '../components/BlogComponent'
import $ from 'jquery'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    // trying to close the modal after the blog has been created....?
    $('#submitBtn').click(function() {
      $('#myModal').modal('hide')
    })
    // requires a way to call to the api for the blogs to load into app state
    onMounted(() => {
      blogService.getAllBlogs()
    })
    return {
      state,
      // call for blogs being loaded into app state to display on page, ties the custom tag to individual items being loaded
      blogs: computed(() => AppState.blogs),
      createBlog() {
        blogService.createBlog(state.newBlog)
      }
    }
  },
  // component tied into both the import for component vue
  components: { BlogComponent }
}
</script>
