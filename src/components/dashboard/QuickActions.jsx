// src/components/dashboard/QuickActions.jsx
import { Link } from 'react-router-dom';

const QuickActions = ({ userId }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

            <div className="space-y-3">
                <Link
                    to="/accounts"
                    className="block bg-blue-50 text-blue-600 p-3 rounded hover:bg-blue-100"
                >
                    View All Accounts
                </Link>

                <Link
                    to="/cards"
                    className="block bg-green-50 text-green-600 p-3 rounded hover:bg-green-100"
                >
                    Manage Cards
                </Link>

                <Link
                    to="/transactions"
                    className="block bg-purple-50 text-purple-600 p-3 rounded hover:bg-purple-100"
                >
                    View Transactions
                </Link>
            </div>
        </div>
    );
};

export default QuickActions;