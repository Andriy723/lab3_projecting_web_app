// src/components/transaction/RecentTransactions.jsx
import { useEffect, useState } from 'react';
import { TransactionService } from '../../services/transactionService';
import TransactionList from './TransactionList';

const RecentTransactions = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await TransactionService.getByUser(userId, { limit: 5 });
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userId]);

    if (loading) return <div>Loading transactions...</div>;

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default RecentTransactions;