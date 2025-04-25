import { useState } from 'react';
import { CardService } from '../../services/cardService';

const AddCardModal = ({ isOpen, onClose, onCardAdded, accountId, userId }) => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardType: 'DEBIT',
        accountID: accountId,
        userID: userId
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const newCard = await CardService.create(formData);
            onCardAdded(newCard);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add card');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                    ✕
                </button>

                <h3 className="font-bold text-lg mb-4">Add New Card</h3>

                {error && (
                    <div className="alert alert-error mb-4">
                        <div className="flex-1">
                            <label>{error}</label>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Card Number</span>
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="input input-bordered"
                            placeholder="1234 5678 9012 3456"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Expiry Date</span>
                            </label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="MM/YY"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">CVV</span>
                            </label>
                            <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="123"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Card Type</span>
                        </label>
                        <select
                            name="cardType"
                            value={formData.cardType}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="DEBIT">Debit</option>
                            <option value="CREDIT">Credit</option>
                            <option value="PREPAID">Prepaid</option>
                        </select>
                    </div>

                    <div className="modal-action">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Card'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCardModal;