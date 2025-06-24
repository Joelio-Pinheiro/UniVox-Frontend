import apiProvider from "../utils/apiProvider"

const authService = {
  login: async ({email, password}) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      const response = await apiProvider.post("login/", {email, password}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Login response:", response)
      return response
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    }
  },
}

export default authService