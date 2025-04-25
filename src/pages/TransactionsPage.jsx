import { useState, useEffect } from 'react';
import { TransactionService } from '../services/transactionService';
import TransactionList from '../components/transaction/TransactionList';
import TransactionFilter from '../components/transaction/TransactionFilter';
import useAuthStore from '../store/authStore';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: ''
    });
    const { user } = useAuthStore();

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await TransactionService.getByUser(user.userID, filters);
                setTransactions(data);
            } catch (error) {
                console.error('Failed to load transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTransactions();
    }, [user.userID, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    if (isLoading) {
        return <div>Loading transactions...</div>;
    }

    return (
        <div className="container mx-auto py-6 px-4">
            <h1 className="text-2xl font-bold mb-6">Transaction History</h1>

            <TransactionFilter
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            <TransactionList transactions={transactions} />
        </div>
    );
};

export default TransactionsPage;