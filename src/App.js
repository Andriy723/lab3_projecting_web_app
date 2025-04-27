import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [editUser, setEditUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'userID', direction: 'asc' });

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        phoneNumber: '',
        isActive: true,
        accountVerified: false
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/users/');
                const sortedUsers = [...res.data].sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
                setUsers(sortedUsers);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { ...formData };
            if (editUser) {
                if (!userData.password) {
                    delete userData.password;
                }
                await axios.put(`http://localhost:8000/api/users/${editUser.userID}`, userData);
                setUsers(users.map(user => user.userID === editUser.userID ? { ...user, ...userData } : user));
            } else {
                const res = await axios.post('http://localhost:8000/api/users/', userData);
                setUsers([...users, res.data]);
            }
            setEditUser(null);
            setFormData({
                userName: '',
                email: '',
                password: '',
                phoneNumber: '',
                isActive: true,
                accountVerified: false
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setFormData({
            userName: user.userName,
            email: user.email,
            password: '',
            phoneNumber: user.phoneNumber,
            isActive: user.isActive,
            accountVerified: user.accountVerified
        });
    };

    const prepareDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${userToDelete.userID}?cascade=true`);
            setUsers(users.filter(user => user.userID !== userToDelete.userID));
            setShowDeleteModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const updatedStatus = !currentStatus;
            await axios.patch(`http://localhost:8000/api/users/${id}`, { isActive: updatedStatus });
            setUsers(users.map(user =>
                user.userID === id ? { ...user, isActive: updatedStatus } : user
            ));
        } catch (err) {
            console.error(err);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="container">
            <h1 className="title">User Management System</h1>

            <div className="form-container">
                <h2>{editUser ? 'Edit User' : 'Add New User'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group password-group">
                        <label>Password:</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required={!editUser}
                                minLength="6"
                            />
                            <button
                                type="button"
                                className="show-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                            />
                            Active
                        </label>
                    </div>
                    <div className="form-group checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="accountVerified"
                                checked={formData.accountVerified}
                                onChange={handleInputChange}
                            />
                            Verified
                        </label>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            {editUser ? 'Update User' : 'Add User'}
                        </button>
                        {editUser && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => {
                                    setEditUser(null);
                                    setFormData({
                                        userName: '',
                                        email: '',
                                        password: '',
                                        phoneNumber: '',
                                        isActive: true,
                                        accountVerified: false
                                    });
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="table-container">
                <h2>Users List</h2>
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th onClick={() => requestSort('userID')}>
                                    ID {sortConfig.key === 'userID' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th onClick={() => requestSort('userName')}>
                                    Username {sortConfig.key === 'userName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th onClick={() => requestSort('email')}>
                                    Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th>Phone</th>
                                <th>Last Login</th>
                                <th>Status</th>
                                <th>Verified</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentUsers.map(user => (
                                <tr key={user.userID}>
                                    <td>{user.userID}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{formatDate(user.lastLogin)}</td>
                                    <td>
                      <span
                          className={`status ${user.isActive ? 'active' : 'inactive'}`}
                          onClick={() => toggleStatus(user.userID, user.isActive)}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                                    </td>
                                    <td>
                      <span className={`verification ${user.accountVerified ? 'verified' : 'unverified'}`}>
                        {user.accountVerified ? 'Yes' : 'No'}
                      </span>
                                    </td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => prepareDelete(user)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete user <strong>{userToDelete.userName}</strong> (ID: {userToDelete.userID})?</p>
                        <p className="warning">Warning: This will delete all associated accounts, cards, and transactions!</p>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button className="delete-btn" onClick={handleDelete}>
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
