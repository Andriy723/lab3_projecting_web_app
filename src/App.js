// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import Layout from './components/common/Layout';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import AccountsPage from './pages/AccountsPage';
import TransactionsPage from './pages/TransactionsPage';
import CardsPage from './pages/CardsPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
    const { checkAuth, loading } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="accounts" element={<AccountsPage />} />
                        <Route path="transactions" element={<TransactionsPage />} />
                        <Route path="cards" element={<CardsPage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;