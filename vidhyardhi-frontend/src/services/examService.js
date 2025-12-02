import api from '../config/api';

const examService = {
    // Get all exams
    getExams: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await api.get(`/exams?${queryParams}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch exams';
        }
    },

    // Get single exam
    getExam: async (id) => {
        try {
            const response = await api.get(`/exams/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch exam';
        }
    },

    // Get exam syllabus
    getSyllabus: async (id) => {
        try {
            const response = await api.get(`/exams/${id}/syllabus`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch syllabus';
        }
    },

    // Get exam cutoffs
    getCutoffs: async (id) => {
        try {
            const response = await api.get(`/exams/${id}/cutoffs`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch cutoffs';
        }
    }
};

export default examService;