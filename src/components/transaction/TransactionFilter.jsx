// src/components/transaction/TransactionFilter.jsx
import { useState } from 'react';

const TransactionFilter = ({ onFilterChange, initialFilters }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            dateFrom: '',
            dateTo: '',
            minAmount: '',
            maxAmount: ''
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="bg-base-200 p-4 rounded-lg mb-6">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">From Date</span>
                        </label>
                        <input
                            type="date"
                            name="dateFrom"
                            value={filters.dateFrom}
                            onChange={handleInputChange}
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">To Date</span>
                        </label>
                        <input
                            type="date"
                            name="dateTo"
                            value={filters.dateTo}
                            onChange={handleInputChange}
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Min Amount</span>
                        </label>
                        <input
                            type="number"
                            name="minAmount"
                            value={filters.minAmount}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Max Amount</span>
                        </label>
                        <input
                            type="number"
                            name="maxAmount"
                            value={filters.maxAmount}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-ghost"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Apply Filters
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TransactionFilter;