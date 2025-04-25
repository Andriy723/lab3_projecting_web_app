// src/components/account/AccountList.jsx
import { useEffect, useState } from 'react';
import { AccountService } from '../../services/accountService';
import AccountCard from './AccountCard';
import TransferFundsModal from './TransferFundsModal';

const AccountList = ({ userId }) => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTransferModal, setShowTransferModal] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await AccountService.getUserAccounts(userId);
                setAccounts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, [userId]);

    const handleTransferComplete = (updatedAccounts) => {
        setAccounts(updatedAccounts);
    };

    if (loading) return <div className="text-center py-4">Loading accounts...</div>;
    if (error) return <div className="text-red-500 py-4">Error: {error}</div>;
    if (accounts.length === 0) return <div className="text-gray-500 py-4">No accounts found</div>;

    return (
        <div className="space-y-6">
            <button
                onClick={() => setShowTransferModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Transfer Funds
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map(account => (
                    <AccountCard key={account.accountID} account={account} />
                ))}
            </div>

            {showTransferModal && (
                <TransferFundsModal
                    accounts={accounts}
                    onClose={() => setShowTransferModal(false)}
                    onTransferComplete={handleTransferComplete}
                />
            )}
        </div>
    );
};

export default AccountList;