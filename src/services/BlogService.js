import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogService {
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
