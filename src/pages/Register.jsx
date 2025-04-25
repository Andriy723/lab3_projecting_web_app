import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import { validateEmail, validatePassword } from '../utils/validators';

const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Валідація в реальному часі
        if (name === 'email') {
            setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        } else if (name === 'password') {
            setErrors(prev => ({ ...prev, password: validatePassword(value) }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Перевірка валідації
        const validationErrors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password)
        };

        setErrors(validationErrors);

        if (validationErrors.email || validationErrors.password) {
            return;
        }

        setIsLoading(true);

        try {
            await AuthService.register(formData);
            navigate('/login', {
                state: {
                    registrationSuccess: true,
                    email: formData.email
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({
                api: error.message || 'Registration failed. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

            {errors.api && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {errors.api}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md shadow-sm ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:border-blue-500 focus:ring-blue-500`}
                        required
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md shadow-sm ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        } focus:border-blue-500 focus:ring-blue-500`}
                        required
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;