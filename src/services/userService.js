import api from './api';

export const UserService = {

    async login(email, password) {
        try {
            const response = await api.post('/users/login', { email, password });

            // Додамо перевірку відповіді
            if (!response.data.user) {
                throw new Error('User data not received');
            }

            return {
                user: {
                    userID: response.data.user.userID,
                    userName: response.data.user.userName,
                    email: response.data.user.email
                },
                tokens: {
                    access: response.data.access_token,
                    refresh: response.data.refresh_token
                }
            };
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            throw error;
        }
    },

    async getUserById(userId) {
        try {
            const response = await api.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    async updateProfile(userId, data) {
        try {
            const response = await api.patch(`/users/${userId}`, data);
            return response.data;
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        }
    },

    async changePassword(userId, currentPassword, newPassword) {
        try {
            const response = await api.post(`/users/${userId}/change-password`, {
                current_password: currentPassword,
                new_password: newPassword
            });
            return response.data;
        } catch (error) {
            console.error('Failed to change password:', error);
            throw error;
        }
    }
};
