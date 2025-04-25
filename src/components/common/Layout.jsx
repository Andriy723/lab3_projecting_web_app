import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="layout">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
