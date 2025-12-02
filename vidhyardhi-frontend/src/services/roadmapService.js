import api from '../config/api';

const roadmapService = {
    // Get all roadmaps
    getRoadmaps: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await api.get(`/roadmaps?${queryParams}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch roadmaps';
        }
    },

    // Get single roadmap
    getRoadmap: async (identifier) => {
        try {
            const response = await api.get(`/roadmaps/${identifier}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch roadmap';
        }
    },

    // Follow/Unfollow roadmap
    followRoadmap: async (roadmapId) => {
        try {
            const response = await api.post(`/roadmaps/${roadmapId}/follow`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to follow roadmap';
        }
    }
};

export default roadmapService;