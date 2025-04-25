import { useState } from 'react';
import AccountList from '../components/account/AccountList';
import AccountForm from '../components/account/AccountForm';
import useAuthStore from '../store/authStore';

const AccountsPage = () => {
    const { user } = useAuthStore();
    const [refreshKey, setRefreshKey] = useState(0);

    const handleAccountCreated = () => {
        setRefreshKey(prev => prev + 1); // Оновлюємо ключ для примусового ререндеру
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Accounts</h1>
                <AccountForm
                    onAccountCreated={handleAccountCreated}
                    userId={user.userID}
                />
            </div>

            <AccountList
                key={refreshKey} // Використовуємо ключ для оновлення
                userId={user.userID}
            />
        </div>
    );
};

export default AccountsPage;