import apiProvider from "../utils/apiProvider";

const headers = {
  "Content-type": "application/json",
};

const postService = {
    async getPosts() {
        try {
        const response = await apiProvider.get("posts/", { headers });
        return response;
        } catch (error) {
            throw error;
        }
    },

    async createPost(title, content, topics = [], is_anonymous = false) {
        try {
            const postData = {
                title,
                content,
                topics,
                is_anonymous
            };
            const response = await apiProvider.post("posts/create/", postData, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },
    
    async deletePost(postId) {
        try {
        const response = await apiProvider.delete(`posts/${postId}`, { headers });
        return response;
        } catch (error) {
            throw error;
        }
    },
}

export default postService;