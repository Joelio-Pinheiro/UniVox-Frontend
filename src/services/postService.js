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
    async getPostById(postId) {
        try {
            const response = await apiProvider.get(`posts/${postId}`, { headers });
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

    async updatePost(postId, title, content, topics, is_anonymous) {
        try {
            const postData = {
                title,
                content,
                topics,
                is_anonymous
            };
            const response = await apiProvider.patch(`posts/${postId}/`, postData, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // comments
    async CreateComment(postId, content, parent_comment= null) {
        try {
            const commentData = {
                content,
                parent_comment
            };
            const response = await apiProvider.post(`posts/${postId}/comment/`, commentData, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },
    async deleteComment(commentId) {
        try {
            const response = await apiProvider.delete(`comments/${commentId}/delete/`, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },
    async updateComment(commentId, content) {
        try {
            const commentData = { content };
            const response = await apiProvider.patch(`comments/${commentId}/update/`, commentData, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // votes
    async likePost(objectId, model_type="post", vote_type=1) {
        try {
            const response = await apiProvider.post(`vote/${model_type}/${objectId}/`, { vote_type }, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },
}

export default postService;