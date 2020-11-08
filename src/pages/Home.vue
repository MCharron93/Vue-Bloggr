<template>
  <div class="home container-fluid bg-tavern">
    <div class="row justify-content-center">
      <div class="col-10 p-3 my-3 card parchment text-center">
        <h1 class="py-4">
          Hello Nerds!
        </h1>
        <p>Welcome to the Local Tavern, come down and sit a spell! Enjoy a good read and collaborate with other adventurers. The Local Tavern has all the gossip on the current editions of your favourite RPG games. Whether it's classics like DnD, or more modern adventures like StarFinder, you'll find your niche! Create blogs, add comments, and see what the hub is all about at your one-stop shop for pint of knowledge.</p>
        <span>
          <button type="button" class="btn btn-secondary justify-self-end" data-toggle="modal" data-target="#myModal">
            &#43; Blog
          </button></span>
      </div>

      <form @submit.prevent="createBlog">
        <div class="modal" tabindex="-1" role="dialog" id="myModal">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  <input class="border border-none" type="text" v-model="state.newBlog.title" placeholder="Title">
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
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- this page will need to load all of the blogs here -->
    <!-- requires a blogs component to model and load into -->
    <div class="row justify-content-around" style="overflow: overlay; max-height: 60vh;">
      <blog-component v-for="blog in blogs" :key="blog" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import BlogComponent from '../components/BlogComponent'
// import $ from 'jquery'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    // trying to close the modal after the blog has been created....?
    // $('#submitBtn').click(function() {
    //   $('#myModal').modal('hide')
    // })
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

<style>
.home{
  background-image: url('wooden.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.parchment{
 opacity: 70%;
 background-color: tan;
}
.container-fluid{
  font-family: 'Oldenburg', cursive;
}

</style>
