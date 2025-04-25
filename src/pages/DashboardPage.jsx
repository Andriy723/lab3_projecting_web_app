// src/pages/DashboardPage.jsx
import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

const DashboardPage = () => {
    const { user, isAuthenticated, loading } = useAuthStore();

    return (
        <div>
            <h1>Welcome, {user?.userName || 'User'}</h1>
            <div>
                <h2>Your profile:</h2>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
        </div>
    );
};

export default DashboardPage;