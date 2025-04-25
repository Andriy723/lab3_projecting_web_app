import { useState } from 'react';
import { AccountService } from '../../services/accountService';

const SendMoneyForm = ({ userId }) => {
    const [formData, setFormData] = useState({
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.fromAccount || !formData.toAccount || !formData.amount) {
            setError('Please fill all required fields');
            return;
        }

        if (parseFloat(formData.amount) <= 0) {
            setError('Amount must be positive');
            return;
        }

        setIsLoading(true);

        try {
            await AccountService.transferFunds(
                formData.fromAccount,
                formData.toAccount,
                parseFloat(formData.amount)
            );
            setSuccess('Transfer completed successfully!');
            setFormData({
                fromAccount: '',
                toAccount: '',
                amount: '',
                description: ''
            });
        } catch (error) {
            setError(error.message || 'Transfer failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Send Money</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">From Account</label>
                    <select
                        name="fromAccount"
                        value={formData.fromAccount}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select account</option>
                        {/* Тут мають бути реальні рахунки користувача */}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-1">To Account</label>
                    <input
                        type="text"
                        name="toAccount"
                        value={formData.toAccount}
                        onChange={handleChange}
                        placeholder="Enter account number"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        step="0.01"
                        min="0.01"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Description (Optional)</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isLoading ? 'Processing...' : 'Send Money'}
                </button>
            </form>
        </div>
    );
};

export default SendMoneyForm;