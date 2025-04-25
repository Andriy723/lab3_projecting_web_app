import { useState } from 'react';
import { AccountService } from '../../services/accountService';

const AccountForm = ({ userId, onAccountCreated }) => {
    const [currency, setCurrency] = useState('UAH');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setIsSubmitting(true);
            await AccountService.createAccount({
                userID: userId,
                currency
            });
            onAccountCreated();
        } catch (error) {
            setError(error.message || 'Failed to create account');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Create New Account</h3>

            {error && <div className="text-red-500 mb-2">{error}</div>}

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <div className="flex-1">
                    <label className="block mb-1">Currency</label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full p-2 border rounded"
                        disabled={isSubmitting}
                    >
                        <option value="UAH">UAH</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isSubmitting ? 'Creating...' : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default AccountForm;