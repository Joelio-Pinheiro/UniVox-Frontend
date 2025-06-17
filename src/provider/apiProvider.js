import axios from "axios"
const BASE_API_URL = "http://localhost:3000/api"

class ApiProvider {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_API_URL,
    })
  }

  async get(path, options = {}) {
    try {
      const response = await this.instance.get(path, options)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async post(path, data = {}, options = {}) {
    try {
      const response = await this.instance.post(path, data, options)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async put(path, data = {}, options = {}) {
    try {
      const response = await this.instance.put(path, data, options)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async delete(path, options = {}) {
    try {
      const response = await this.instance.delete(path, options)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  handleError(error) {
    console.error("API Error:", error)
    throw error
  }
}

const apiProvider = new ApiProvider()

export default apiProvider
