import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogService {
  async editBlog(blogData) {
    try {
      const res = await api.put('/api/blogs/' + blogData.blogId, blogData)
      // console.log(res.data)
      AppState.activeBlog = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async removeBlog(blogId) {
    try {
      await api.delete('/api/blogs/' + blogId)
    } catch (error) {
      console.error(error)
    }
  }

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
      this.getCommentsbyActiveBlog(commentData.blog)
    } catch (error) {
      console.error(error)
    }
  }

  async editComment(commentInfo) {
    try {
      const res = await api.put('/api/comments/' + commentInfo._id, commentInfo)
      AppState.comments = res.data
      this.getCommentsbyActiveBlog(commentInfo.blog)
      // console.log(AppState.comments)
    } catch (error) {
      console.error(error)
    }
  }

  async removeComment(commentId, blogId) {
    try {
      await api.delete('/api/comments/' + commentId)
      // console.log(res)
      this.getCommentsbyActiveBlog(blogId)
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
