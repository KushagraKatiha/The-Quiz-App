import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BaseComponent from './BaseComponent';
import { useDarkMode } from '../Context/DarkModeContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const { darkMode } = useDarkMode();
    const { token } = useParams();

    const [newPassword, setNewPassword] = useState('');
    const [isResetSuccessful, setIsResetSuccessful] = useState(false);

    const showToast = (message, type = 'info') => {
        toast(message, { type });
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(`http://localhost:9090/reset-password/${token}`, {
                newPassword: newPassword,
            });

            if (response.status === 200) {
                setIsResetSuccessful(true);
                showToast('Password reset successful! Please login.', 'success');
            }
        } catch (err) {
            showToast('Error resetting password. Please try again.', 'error');
            console.error(err.message);
        }
    }

    return (
        <BaseComponent>
            <h1 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-green-400' : 'text-purple-600'}`}>The Quiz App</h1>

            {isResetSuccessful ? (
                <div className="text-center">
                    <p className={`${darkMode ? 'text-white' : 'text-black'}`}>
                        Password reset successful! <Link to="/login-account" className={`${darkMode ? 'text-blue-500' : 'text-blue-700'}`}>Login here</Link>.
                    </p>
                </div>
            ) : (
                <form className="flex-col space-y-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    />
                    <input
                        type="button"
                        value="Reset Password"
                        onClick={handleResetPassword}
                        className={`bg-yellow-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-yellow-700' : 'hover:bg-yellow-400'}`}
                    />
                </form>
            )}

            {/* Toast Container for displaying popups */}
            <ToastContainer />
        </BaseComponent>
    );
};

export default ResetPassword;
