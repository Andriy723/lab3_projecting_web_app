// src/components/dashboard/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/dashboard" className="text-xl font-bold text-blue-600">
                    Банківська система
                </Link>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
            <span className="mr-4 font-medium">
              {user?.userName || 'Користувач'}
            </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Вийти
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;