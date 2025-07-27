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
            const response = await apiProvider.delete(`posts/${postId}/delete/`, { headers });
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
            const response = await apiProvider.patch(`posts/${postId}/update/`, postData, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getFilteredPosts({ search = "", topics = [], order = "desc" }) {
        try {
            const posts = await postService.getPosts();

            const filtered = posts
                .filter(post => {
                    if (!search) return true;
                    return post.title.toLowerCase().includes(search.toLowerCase());
                })

                .filter(post => {
                    if (topics.length === 0) return true;

                    const topicNames = post.topics.map(t => t.name.toLowerCase());
                    const topicIds = post.topics.map(t => t.id);

                    return topics.every(topic =>
                        typeof topic === "string"
                            ? topicNames.includes(topic.toLowerCase())
                            : topicIds.includes(topic)
                    );
                })

                .sort((a, b) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return order === "asc" ? dateA - dateB : dateB - dateA;
                });

            return filtered;
        } catch (error) {
            console.error("Erro ao filtrar posts:", error);
            return [];
        }
    },


    // comments
    async CreateComment(postId, content, parent_comment = null) {
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
            console.log("Update response:", response);
            return response;
        } catch (error) {
            console.error("Error updating comment:", error);
            throw error;
        }
    },

    // votes
    async likePost(objectId, model_type = "post", vote_type = 1) {
        try {
            const response = await apiProvider.post(`vote/${model_type}/${objectId}/`, { vote_type }, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },
}

export default postService;