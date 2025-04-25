import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AuthService from '../services/authService';
import { UserService } from '../services/userService';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            login: async (email, password) => {
                set({ loading: true, error: null });
                try {
                    const { user, tokens } = await AuthService.login(email, password);

                    localStorage.setItem('access_token', tokens.access);
                    localStorage.setItem('refresh_token', tokens.refresh);

                    const fullUserData = await UserService.getUserById(user.userID);

                    set({
                        user: fullUserData,
                        isAuthenticated: true,
                        loading: false
                    });
                } catch (error) {
                    set({
                        user: null,
                        isAuthenticated: false,
                        loading: false,
                        error: error.message
                    });
                    throw error;
                }
            },

            checkAuth: async () => {
                set({ loading: true });
                try {
                    const token = localStorage.getItem('access_token');
                    if (!token) throw new Error('No token');

                    // Отримуємо userID з токена
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const user = await UserService.getUserById(payload.user_id);

                    set({
                        user,
                        isAuthenticated: true,
                        loading: false
                    });
                } catch (error) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    set({
                        user: null,
                        isAuthenticated: false,
                        loading: false
                    });
                }
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
