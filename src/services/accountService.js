import api from './api';

export const AccountService = {
    async getUserAccounts(userId) {
        try {
            const response = await api.get(`/accounts/user/${userId}`);
            return response.data.accounts; // Важливо: зверніть увагу на структуру відповіді
        } catch (error) {
            console.error('Error fetching accounts:', error);
            throw error;
        }
    },

    async createAccount(accountData) {
        try {
            const response = await api.post('/accounts', accountData);
            return response.data.account; // Припустимо, що сервер повертає створений рахунок
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    },

    async deleteAccount(accountId) {
        try {
            await api.delete(`/accounts/${accountId}`);
            return accountId;
        } catch (error) {
            console.error('Error deleting account:', error);
            throw error;
        }
    }
};