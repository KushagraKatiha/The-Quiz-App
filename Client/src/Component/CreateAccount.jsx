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

    const roleOptions = [
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' },
    ];

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
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
            console.error(err.message);
        }
    }

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
                <input
                    type="text"
                    placeholder="Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                />
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
