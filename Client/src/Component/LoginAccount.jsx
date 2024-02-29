import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BaseComponent from './BaseComponent';
import { useDarkMode } from '../Context/DarkModeContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginAccount = () => {
    const navigate = useNavigate();
    const { darkMode } = useDarkMode();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const showToast = (message, type = 'info') => {
        toast(message, { type });
    };

    const handleLogin = async () => {
        try {
            setLoading(true);

            const response = await axios.post('http://localhost:9090/login', {
                email: email,
                password: password
            }, { withCredentials: true });

            if (response.status === 200) {
                showToast('Login successful', 'success');
                const userProfileType = response.data.user.profileType;

                if (userProfileType === 'student') {
                    setTimeout(() => {
                        navigate('/student-option-page');
                    }, 2000);
                } else if (userProfileType === 'teacher') {
                    setTimeout(() => {
                        navigate('/teacher-option-page');
                    }, 2000);
                }
            }
        } catch (err) {
            setError('Invalid credentials');
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseComponent>
            <h1 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-green-400' : 'text-purple-600'}`}>The Quiz App</h1>
            <form className="flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                />
                <input
                    type="button"
                    value={loading ? 'Logging in...' : 'Login'}
                    onClick={handleLogin}
                    disabled={loading}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-400'}`}
                />
            </form>
            <div className="text-center">
                <div className={`mb-4 ${darkMode ? 'text-yellow-500' : 'text-gray-700'}`}>
                    <span>Don't have an account?</span>
                    <Link to="/" className={`${darkMode ? 'text-blue-500' : 'text-blue-700'} ml-1`}>Create one here</Link>
                </div>
                <div className={`mb-4 ${darkMode ? 'text-yellow-500' : 'text-gray-700'}`}>
                    <Link to="/forgot-password" className={`${darkMode ? 'text-blue-500' : 'text-blue-700'}`}>Forgot Password?</Link>
                </div>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div className="border-t-4 border-blue-500 rounded-full h-12 w-12 animate-spin"></div>
                </div>
            )}

            {/* Toast Container for displaying popups */}
            <ToastContainer />
        </BaseComponent>
    );
};

export default LoginAccount;
