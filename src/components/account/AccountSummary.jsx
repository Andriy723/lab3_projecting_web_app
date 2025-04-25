// src/components/account/AccountSummary.jsx
import { useEffect, useState } from 'react';
import { AccountService } from '../../services/accountService';

const AccountSummary = ({ userId }) => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await AccountService.getUserAccounts(userId);
                setAccounts(data.accounts || []); // Зверніть увагу на структуру відповіді
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, [userId]);

    if (loading) return <div className="text-center py-4">Завантаження рахунків...</div>;
    if (error) return <div className="text-red-500 py-4">Помилка: {error}</div>;
    if (accounts.length === 0) return <div className="text-gray-500 py-4">Рахунків не знайдено</div>;

    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Рахунки</h2>

            <div className="mb-4">
                <p className="text-lg">
                    <span className="font-bold">{totalBalance.toFixed(2)} UAH</span>
                    <span className="text-sm text-gray-500 ml-2">(загальний баланс)</span>
                </p>
            </div>

            <div className="space-y-3">
                {accounts.map(account => (
                    <div key={account.accountID} className="flex justify-between items-center p-3 border-b">
                        <div>
                            <p className="font-medium">{account.accountNumber}</p>
                            <p className="text-sm text-gray-500">{account.currency}</p>
                        </div>
                        <p className="font-bold">{account.balance.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountSummary;