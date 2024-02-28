import React, { useState } from 'react';
import Select from 'react-select';
import BaseComponent from './BaseComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../Context/DarkModeContext';
import axios from 'axios';

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

    const roleOptions = [
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' },
    ];

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
    };

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:9090/send-otp', {
                email: email,
            });

            console.log(response.data);
            console.log(response.status);

            if (response.status === 200) {
                setShowOtpField(true);
                alert('OTP sent successfully');
            } else {
                alert('Failed to send OTP');
            }
        } catch (err) {
            console.error(err.message);
            alert('Failed to send OTP');
        }
    };

    

    const handleVerifyOtp = () => {
            axios.post('http://localhost:9090/verify-otp', {
                email: email,
                otp: otp,
            },).then((response)=>{
                console.log(response.data);
                // hide verify buton
                if(response.data.success === true){
                    setShowOtpField(false)
                }
            }).catch((err)=>{
                console.log(err.message);
            })
    };

    const handleCreateAccount = async () => {
        try {
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
                alert('Account created successfully');
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
            if(message === 'User already exists') {
                alert('User already exists');
            }else if(message === 'Please verify your email address first') {
                alert('Please verify your email address first');
            }else if(message === 'All fields are required') {
                alert('All fields are required');
            }else if(message === 'Passwords do not match') {
                alert('Passwords do not match');
            }else if(message === 'Please enter a valid email') {
                alert('Please enter a valid email');
            }else {
            console.error(err.message);
            }
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
                <input
                    type="button"
                    value="Create Account"
                    onClick={handleCreateAccount}
                    className={`bg-green-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-green-700' : 'hover:bg-green-400'}`}
                />
            </form>
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
