import api from '../config/api';

const collegeService = {
    // Get all colleges with filters
    getColleges: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await api.get(`/colleges?${queryParams}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch colleges';
        }
    },

    // Get single college
    getCollege: async (id) => {
        try {
            const response = await api.get(`/colleges/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch college';
        }
    },

    // Create college (admin only)
    createCollege: async (collegeData) => {
        try {
            const response = await api.post('/colleges', collegeData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to create college';
        }
    },

    // Update college (admin only)
    updateCollege: async (id, collegeData) => {
        try {
            const response = await api.put(`/colleges/${id}`, collegeData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to update college';
        }
    },

    // Delete college (admin only)
    deleteCollege: async (id) => {
        try {
            const response = await api.delete(`/colleges/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to delete college';
        }
    },

    // Add review
    addReview: async (collegeId, reviewData) => {
        try {
            const response = await api.post(`/colleges/${collegeId}/reviews`, reviewData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to add review';
        }
    },

    // Compare colleges
    compareColleges: async (collegeIds) => {
        try {
            const response = await api.post('/colleges/compare', { collegeIds });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to compare colleges';
        }
    }
};

export default collegeService;