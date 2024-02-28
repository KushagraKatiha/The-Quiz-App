import React, { useState } from 'react';
import Select from 'react-select';
import BaseComponent from './BaseComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../Context/DarkModeContext';
import axios from 'axios';
import Modal from 'react-modal';

const CreateAccount = () => {
    const navigate = useNavigate();
    const { darkMode } = useDarkMode();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState({ value: 'student', label: 'Student' });

    const [showOtpField, setShowOtpField] = useState(false);
    const [otp, setOtp] = useState('');

    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const roleOptions = [
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' },
    ];

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
    };

    const openModal = (message) => {
        setModalIsOpen(true);
        setModalMessage(message);
    };

    const closeModal = () => {
        setModalIsOpen(false);
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
                openModal('OTP sent successfully');
            } else {
                openModal('Failed to send OTP');
            }
        } catch (err) {
            console.error(err.message);
            openModal('Failed to send OTP');
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
                openModal('Account created successfully');
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
            if (message === 'User already exists') {
                openModal('User already exists');
            } else if (message === 'Please verify your email address first') {
                openModal('Please verify your email address first');
            } else if (message === 'All fields are required') {
                openModal('All fields are required');
            } else if (message === 'Passwords do not match') {
                openModal('Passwords do not match');
            } else if (message === 'Please enter a valid email') {
                openModal('Please enter a valid email');
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
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                />
                <input
                    type="text"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                />
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

            {/* Modal/Popup */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Message Modal"
                className={`Modal ${darkMode ? 'ModalDark' : 'ModalLight'}`}
                overlayClassName={`Overlay ${darkMode ? 'OverlayDark' : 'OverlayLight'}`}
            >
                <div className="text-center">
                    <p>{modalMessage}</p>
                    <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Close
                    </button>
                </div>
            </Modal>
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
