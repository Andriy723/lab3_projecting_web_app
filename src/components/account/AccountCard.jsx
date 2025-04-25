// src/components/account/AccountCard.jsx
const AccountCard = ({ account }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">
                {account.accountNumber}
            </h3>
            <p className="text-gray-600 mb-1">
                Balance: {account.balance.toFixed(2)} {account.currency}
            </p>
            <p className="text-gray-600">
                Created: {new Date(account.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4 flex space-x-2">
                <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">
                    Details
                </button>
                <button className="bg-green-100 text-green-600 px-3 py-1 rounded text-sm">
                    Deposit
                </button>
            </div>
        </div>
    );
};

export default AccountCard;