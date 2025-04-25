import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Payment System</h1>
                    <nav>
                        <Link to="/login" className="mr-4 hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto py-8">
                <section className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Welcome to Payment System</h2>
                    <p className="text-xl text-gray-600">
                        Send and receive money securely with our payment platform
                    </p>
                </section>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">Fast Transfers</h3>
                        <p>Send money to anyone in minutes</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                        <p>Your transactions are always protected</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
                        <p>Control your finances effortlessly</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;