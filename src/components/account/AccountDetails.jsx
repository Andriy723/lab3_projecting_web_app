// components/account/AccountDetails.jsx
import { useState, useEffect } from 'react';
import { AccountService } from '../../services/accountService';
import { TransactionService } from '../../services/transactionService';
import useAuthStore from '../../store/authStore';

const AccountDetails = ({ accountId }) => {
    const [account, setAccount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [accountData, transactionsData] = await Promise.all([
                    AccountService.getById(accountId),
                    TransactionService.getByAccount(accountId, { limit: 5 })
                ]);

                setAccount(accountData);
                setTransactions(transactionsData.transactions);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [accountId]);

    if (loading) return <div>Loading account details...</div>;
    if (!account) return <div>Account not found</div>;

    return (
        <div className="account-details">
            <h2>{account.accountNumber}</h2>
            <p>Balance: {account.balance} {account.currency}</p>

            <h3>Recent Transactions</h3>
            <ul>
                {transactions.map(tx => (
                    <li key={tx.id}>
                        {tx.date}: {tx.amount} {tx.currency}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccountDetails;