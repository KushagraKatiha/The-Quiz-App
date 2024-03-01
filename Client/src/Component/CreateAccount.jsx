import React, { useState } from 'react';
import Select from 'react-select';
import BaseComponent from './BaseComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../Context/DarkModeContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAccount = () => {
    const navigate = useNavigate();
    const { darkMode } = useDarkMode();
    
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState({ value: 'student', label: 'Student' });

    const [showOtpField, setShowOtpField] = useState(false);
    const [otp, setOtp] = useState('');

    const [loading, setLoading] = useState(false);


    const roleOptions = [
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' },
    ];

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
    };

    const showToast = (message, type = 'info') => {
        toast(message, { type });
    };

    const handleSendOtp = async () => {
        try {
            setLoading(true);

            const response = await axios.post('http://localhost:9090/send-otp', {
                email: email,
            });

            console.log(response.data);
            console.log(response.status);

            if (response.status === 200) {
                setShowOtpField(true);
                showToast('OTP sent successfully', 'success');
            } else {
                showToast('Failed to send OTP', 'error');
            }
        } catch (err) {
            console.error(err.message);
            showToast('Failed to send OTP', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = () => {
        setLoading(true);

        axios.post('http://localhost:9090/verify-otp', {
            email: email,
            otp: otp,
        }).then((response) => {
            console.log(response.data);
            if (response.data.success === true) {
                showToast('OTP verified successfully');
                setShowOtpField(false);
            }
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleCreateAccount = async () => {
        try {
            setLoading(true);

            const response = await axios.post('http://localhost:9090/signup', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                profileType: selectedRole.value
            });

            console.log(response.data);
            console.log(response.status);

            if (response.status === 201) {
                showToast('Account created successfully', 'success');
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setSelectedRole({ value: 'student', label: 'Student' });
            }

            if (response.status !== 400) {
                navigate('/login-account');
            }

        } catch (err) {
            const message = err.response.data.message;
            if (message === 'User already exists') {
                showToast('User already exists', 'error');
            } else if (message === 'Please verify your email address first') {
                showToast('Please verify your email address first', 'error');
            } else if (message === 'All fields are required') {
                showToast('All fields are required', 'error');
            } else if (message === 'Passwords do not match') {
                showToast('Passwords do not match', 'error');
            } else if (message === 'Please enter a valid email') {
                showToast('Please enter a valid email', 'error');
            } else {
                console.error(err.message);
            }
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
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                />
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    />
                    {!showOtpField && (
                        <input
                            type="button"
                            value="Send OTP"
                            onClick={handleSendOtp}
                            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-400'}`}
                        />
                    )}
                </div>
                {showOtpField && (
                    <>
                        <input
                            type="text"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        />
                        <input
                            type="button"
                            value="Verify"
                            onClick={handleVerifyOtp}
                            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-400'}`}
                        />
                    </>
                )}
               <div className="flex flex-col space-y-2 relative">
               <div className="flex items-center space-x-2 relative">
                    <input
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-1 top-1 mt-1 mr-2 px-2 py-1 ${darkMode ? 'text-white' : 'text-black'} ${darkMode ? 'bg-transparent' : 'bg-white'} rounded-md`}
                    >
                        {showPassword ? (
                            // Eye icon when password is visible
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 9a8 8 0 11-16 0 8 8 0 0116 0z"
                                />
                            </svg>
                        ) : (
                            // Closed eye icon when password is hidden
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19.34 6.34l-2.2-2.2a10 10 0 00-12.68 0l-2.2 2.2a12 12 0 0115.08 0zM12 14l-1-1m-2 0l-1 1m4 0l-1-1m2 0l-1 1m3-7a9 9 0 00-17.83 2.83L2 9a10 10 0 0019.17-3.17A9 9 0 0022 7m-4-1a5 5 0 11-10 0 5 5 0 0110 0z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    />
                </div>
                <Select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    options={roleOptions}
                    className={`border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-black' : 'bg-white'}`}
                    isSearchable={false}
                    placeholder="Select Role"
                />
            </form>
            <input
                type="button"
                value="Create Account"
                onClick={handleCreateAccount}
                disabled={loading}
                className={`bg-green-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-green-700' : 'hover:bg-green-400'}`}
            />

            {/* Loading Spinner */}
            {loading && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div className="border-t-4 border-green-500 rounded-full h-12 w-12 animate-spin"></div>
                </div>
            )}

            {/* Toast Container for displaying popups */}
            <ToastContainer />

            <div className={`text-center ${darkMode ? 'text-yellow-500' : 'text-gray-700'}`}>
                <div className="mb-4">
                    <span>Already have an account?</span>
                    <Link to="/login-account" className={`${darkMode ? 'text-blue-500' : 'text-blue-700'} ml-1`}>Login here</Link>
                </div>
            </div>
        </BaseComponent>
    );
};

export default CreateAccount;
