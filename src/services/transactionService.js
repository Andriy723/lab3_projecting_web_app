// services/transactionService.js
import api from "./api";

export const TransactionService = {
    async create(transactionData) {
        const response = await api.post('/transactions', transactionData);
        return response.data;
    },

    async getByAccount(accountId, params = {}) {
        const response = await api.get(`/transactions/account/${accountId}`, { params });
        return response.data;
    },

    async getByUser(userId) {
        const response = await api.get(`/transactions/user/${userId}`);
        return response.data;
    },

    async getDetails(transactionId) {
        const response = await api.get(`/transactions/${transactionId}`);
        return response.data;
    },

    async exportToCSV(accountId) {
        const response = await api.get(`/transactions/export/${accountId}`);
        return response.data;
    }
};
