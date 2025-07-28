import axios from "axios";
const BASE_API_URL = "https://univox-backend.onrender.com/";

class ApiProvider {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_API_URL,
      withCredentials: true,
    });
  }

  async get(path, options = {}) {
    try {
      const response = await this.instance.get(path, options);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(path, data = {}, options = {}) {
    try {
      const response = await this.instance.post(path, data, options);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async put(path, data = {}, options = {}) {
    try {
      const response = await this.instance.put(path, data, options);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch(path, data = {}, options = {}) {
    try {
      const response = await this.instance.patch(path, data, options);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(path, data = {}, options = {}) {
    try {
      const response = await this.instance.delete(path, data, options);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error("API Error:", error);
    throw error;
  }
}

const apiProvider = new ApiProvider();

export default apiProvider;
