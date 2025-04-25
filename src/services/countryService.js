// services/countryService.js
import api from "./api";

let countriesCache = null;

export const CountryService = {
    async getAll() {
        if (countriesCache) return countriesCache;

        const response = await api.get('/countries');
        countriesCache = response.data.countries;
        return countriesCache;
    },

    async getById(id) {
        const response = await api.get(`/countries/${id}`);
        return response.data;
    },

    async create(countryData) {
        const response = await api.post('/countries', countryData);
        countriesCache = null; // Інвалідуємо кеш
        return response.data;
    },

    async search(query) {
        const response = await api.get('/countries/search', { params: { q: query } });
        return response.data;
    }
};