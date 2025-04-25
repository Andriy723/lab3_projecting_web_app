import api from './api';

const AuthService = {
    async register(userData) {
        try {
            // Перевіряємо обов'язкові поля
            if (!userData.userName || !userData.email || !userData.password || !userData.phoneNumber) {
                throw new Error('All fields are required');
            }

            const response = await api.post('/users', {
                userName: userData.userName,
                email: userData.email,
                password: userData.password,
                phoneNumber: userData.phoneNumber
            });

            // Додаємо перевірку на успішну відповідь
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error(response.data?.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);

            // Правильна обробка помилок
            if (error.response) {
                // Помилка від сервера (4xx, 5xx)
                throw new Error(error.response.data?.message ||
                    error.response.data?.detail ||
                    `Server error: ${error.response.status}`);
            } else if (error.request) {
                // Запит був зроблений, але відповіді не отримано
                throw new Error('No response from server');
            } else {
                // Помилка під час налаштування запиту
                throw new Error(error.message || 'Request setup failed');
            }
        }
    },

    async login(email, password) {
        const response = await api.post('/users/login', { email, password });
        return {
            user: response.data.user,
            tokens: {
                access: response.data.access_token,
                refresh: response.data.refresh_token
            }
        };
    },

    async getCurrentUser() {
        const response = await api.get('/users/me');
        return response.data;
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};

export default AuthService; // Важно: default export