import api from '../config/api';

const questionService = {
    // Get questions
    getQuestions: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await api.get(`/questions?${queryParams}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch questions';
        }
    },

    // Submit answer
    submitAnswer: async (questionId, answerData) => {
        try {
            const response = await api.post(`/questions/${questionId}/submit`, answerData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to submit answer';
        }
    },

    // Get user progress
    getUserProgress: async (type, referenceId) => {
        try {
            const response = await api.get(`/questions/progress/${type}/${referenceId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch progress';
        }
    }
};

export default questionService;