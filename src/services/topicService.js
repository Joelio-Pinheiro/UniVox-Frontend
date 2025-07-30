import apiProvider from "../utils/apiProvider";

const headers = {
  "Content-type": "application/json",
};

const topicService = {
    async getTopics() {
        try {
            const response = await apiProvider.get("topics/", { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },

    async createTopic(name) {
        try {
            const topicData = { name };
            const response = await apiProvider.post("topics/create/", topicData, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getPostByTopic(topicId) {
        try {
            const response = await apiProvider.get(`topics/${topicId}/posts/`, { headers });
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getMeTopics() {
        try {
            const response = await apiProvider.get("users/me/recent-topics/", { headers });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default topicService;
