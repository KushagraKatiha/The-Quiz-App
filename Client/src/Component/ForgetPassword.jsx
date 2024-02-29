import React, { useState } from 'react';
import BaseComponent from './BaseComponent';
import { useDarkMode } from '../Context/DarkModeContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
    const { darkMode } = useDarkMode();

    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const showToast = (message, type = 'info') => {
        toast(message, { type });
    };

    const handleForgetPassword = async () => {
        try {
            const response = await axios.post('http://localhost:9090/reset-password', {
                email: email,
            });

            if (response.status === 200) {
                setIsEmailSent(true);
                showToast('Email sent successfully! Please check your inbox to reset the password.', 'success');
            }
        } catch (err) {
            showToast('Error sending reset password link. Please try again.', 'error');
            console.error(err.message);
        }
    }

    return (
        <BaseComponent>
            <h1 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-green-400' : 'text-purple-600'}`}>The Quiz App</h1>

            {isEmailSent ? (
                <div className="text-center">
                    <p className={`${darkMode ? 'text-white' : 'text-black'}`}>
                        Email sent successfully! Please check your inbox to reset the password.
                    </p>
                </div>
            ) : (
                <form className="flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    />
                    <input
                        type="button"
                        value="Reset Password"
                        onClick={handleForgetPassword}
                        className={`bg-yellow-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-yellow-700' : 'hover:bg-yellow-400'}`}
                    />
                </form>
            )}

            <div className="text-center">
                <div className={`mb-4 ${darkMode ? 'text-yellow-500' : 'text-gray-700'}`}>
                    <span>Remember your password?</span>
                    <Link to="/login-account" className={`${darkMode ? 'text-blue-500' : 'text-blue-700'} ml-1`}>Login here</Link>
                </div>
            </div>

            {/* Toast Container for displaying popups */}
            <ToastContainer />
        </BaseComponent>
    );
};

export default ForgetPassword;
