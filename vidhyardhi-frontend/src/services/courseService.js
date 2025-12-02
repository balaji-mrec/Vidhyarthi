import api from '../config/api';

const courseService = {
    // Get all courses
    getCourses: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await api.get(`/courses?${queryParams}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch courses';
        }
    },

    // Get single course
    getCourse: async (identifier) => {
        try {
            const response = await api.get(`/courses/${identifier}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch course';
        }
    },

    // Enroll in course
    enrollCourse: async (courseId) => {
        try {
            const response = await api.post(`/courses/${courseId}/enroll`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to enroll';
        }
    },

    // Get topics for a course
    getTopics: async (courseId) => {
        try {
            const response = await api.get(`/topics/course/${courseId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch topics';
        }
    },

    // Get single topic
    getTopic: async (topicId) => {
        try {
            const response = await api.get(`/topics/${topicId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch topic';
        }
    },

    // Mark topic as complete
    completeTopic: async (topicId) => {
        try {
            const response = await api.post(`/topics/${topicId}/complete`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to mark complete';
        }
    },

    // Submit code
    submitCode: async (topicId, codeData) => {
        try {
            const response = await api.post(`/topics/${topicId}/submit`, codeData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to submit code';
        }
    }
};

export default courseService;