// services/paymentMethodService.js
import api from "./api";

export const PaymentMethodService = {
    async create(methodData) {
        const response = await api.post('/payment-methods', methodData);
        return response.data;
    },

    async getUserMethods(userId) {
        const response = await api.get(`/payment-methods/user/${userId}`);
        return response.data.payment_methods;
    },

    async setDefault(methodId) {
        const response = await api.post(`/payment-methods/${methodId}/set-default`);
        return response.data;
    },

    async delete(methodId) {
        const response = await api.delete(`/payment-methods/${methodId}`);
        return response.data;
    },

    async validateCard(cardData) {
        const response = await api.post('/payment-methods/validate', cardData);
        return response.data.is_valid;
    }
};