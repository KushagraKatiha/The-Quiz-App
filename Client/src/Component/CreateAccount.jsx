import React, { useState } from 'react';
import Select from 'react-select';
import BaseComponent from './BaseComponent';
import { Link, Navigate } from 'react-router-dom';
import { useDarkMode } from '../Context/DarkModeContext';

const CreateAccount = () => {
    const { darkMode } = useDarkMode();
    const [selectedRole, setSelectedRole] = useState({ value: 'student', label: 'Student' });

    const roleOptions = [
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' },
    ];

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
    };

    return (
        <BaseComponent>
            <h1 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-green-400' : 'text-purple-600'}`}>The Quiz App</h1>
            <form className="flex-col space-y-4">
                <input type="text" placeholder="Name"  className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`} />
                <input type="text" placeholder="Mail"  className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`} />
                <input type="text" placeholder="Password" className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`} />
                <input type="text" placeholder="Confirm Password"  className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`} />
                <Select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    options={roleOptions}
                    className={`border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-black' : 'bg-white'}`}
                    isSearchable={false}
                    placeholder="Select Role"
                />
                <input type="button" value="Create Account" className={`bg-green-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-green-700' : 'hover:bg-green-400'}`} />
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
