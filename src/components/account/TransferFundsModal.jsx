import { useState } from 'react';
import { AccountService } from '../../services/accountService';
import PropTypes from 'prop-types';

const TransferFundsModal = ({ accounts, onClose, onTransferComplete }) => {
    const [formData, setFormData] = useState({
        fromAccountId: '',
        toAccountId: '',
        amount: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Валідація
        if (formData.fromAccountId === formData.toAccountId) {
            setError('Cannot transfer to the same account');
            return;
        }

        const amount = parseFloat(formData.amount);
        if (isNaN(amount) || amount <= 0) {
            setError('Amount must be a positive number');
            return;
        }

        // Перевірка достатності коштів
        const fromAccount = accounts.find(acc => acc.accountID === formData.fromAccountId);
        if (fromAccount && amount > fromAccount.balance) {
            setError('Insufficient funds');
            return;
        }

        setIsSubmitting(true);

        try {
            // Виконуємо переказ через сервіс
            await AccountService.transferFunds(
                formData.fromAccountId,
                formData.toAccountId,
                amount
            );

            // Оновлюємо баланси рахунків
            const updatedAccounts = accounts.map(account => {
                if (account.accountID === formData.fromAccountId) {
                    return {
                        ...account,
                        balance: parseFloat((account.balance - amount).toFixed(2))
                    };
                }
                if (account.accountID === formData.toAccountId) {
                    return {
                        ...account,
                        balance: parseFloat((account.balance + amount).toFixed(2))
                    };
                }
                return account;
            });

            onTransferComplete(updatedAccounts);
            onClose(); // Закриваємо модалку після успішного переказу
        } catch (err) {
            console.error('Transfer error:', err);
            setError(err.response?.data?.detail || err.message || 'Transfer failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Transfer Funds</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={isSubmitting}
                    >
                        &times;
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            From Account
                        </label>
                        <select
                            name="fromAccountId"
                            value={formData.fromAccountId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            disabled={isSubmitting}
                        >
                            <option value="">Select account</option>
                            {accounts.map(account => (
                                <option
                                    key={account.accountID}
                                    value={account.accountID}
                                >
                                    {account.accountNumber} ({account.currency} {account.balance.toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To Account
                        </label>
                        <select
                            name="toAccountId"
                            value={formData.toAccountId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            disabled={isSubmitting}
                        >
                            <option value="">Select account</option>
                            {accounts
                                .filter(account => account.accountID !== formData.fromAccountId)
                                .map(account => (
                                    <option
                                        key={account.accountID}
                                        value={account.accountID}
                                    >
                                        {account.accountNumber} ({account.currency} {account.balance.toFixed(2)})
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            name="amount"
                            step="0.01"
                            min="0.01"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Transfer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

TransferFundsModal.propTypes = {
    accounts: PropTypes.arrayOf(
        PropTypes.shape({
            accountID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            accountNumber: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
    onTransferComplete: PropTypes.func.isRequired
};

export default TransferFundsModal;
