import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogService {
  async getMyBlogs() {
    try {
      const res = await api.get('/api/profile/blogs')
      // console.log(res.data)
      AppState.myBlogs = res.data
      // console.log(AppState.myBlogs)
    } catch (error) {
      console.error(error)
    }
  }

  async createBlog(newBlogData) {
    try {
      await api.post('/api/blogs/', newBlogData)
      this.getAllBlogs()
      console.log(AppState.blogs)
    } catch (error) {
      console.error(error)
    }
  }

  async addComment(commentData) {
    try {
      const res = await api.post('/api/comments/', commentData)
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async removeComment(commentId) {
    try {
      const res = await api.delete('/api/comments/' + commentId)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  async getCommentsbyActiveBlog(blogData) {
    try {
      const res = await api.get('/api/blogs/' + blogData + '/comments')
      // console.log(res.data)
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async setActiveBlog(blogData) {
    try {
      const res = await api.get('/api/blogs/' + blogData)
      // console.log(res.data)
      AppState.activeBlog = res.data
      this.getCommentsbyActiveBlog(blogData)
      // console.log(AppState.activeBlog)
    } catch (error) {
      console.error(error)
    }
  }

  async getAllBlogs() {
    try {
      const res = await api.get('/api/blogs')
      // console.log(res.data)
      AppState.blogs = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const blogService = new BlogService()
