import api from './api';

export const CardService = {
    async create(cardData) {
        const response = await api.post('/cards', cardData);
        return response.data;
    },

    async getByAccount(accountId) {
        const response = await api.get(`/cards/account/${accountId}`);
        return response.data.cards;
    },

    async blockCard(cardId) {
        const response = await api.post(`/cards/${cardId}/block`);
        return response.data;
    }
};