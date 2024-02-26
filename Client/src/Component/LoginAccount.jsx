import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BaseComponent from './BaseComponent';
import { useDarkMode } from '../Context/DarkModeContext';
import axios from 'axios';

const LoginAccount = () => {
    const navigate = useNavigate();
    const { darkMode } = useDarkMode();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:9090/login', {
                email: email,
                password: password
            }, { withCredentials: true });

            console.log(response.data);
            console.log(response.status);

            if (response.status === 200) {
                alert('Login successful');
                const userProfileType = response.data.user.profileType;
                console.log(userProfileType)

                if (userProfileType === 'student') {
                    navigate('/student-option-page');
                } else if (userProfileType === 'teacher') {
                    navigate('/teacher-option-page');
                }
            }
        } catch (err) {
            alert('Invalid credentials');
            console.error(err.message);
        }
    }

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
                    value="Login"
                    onClick={handleLogin}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-400'}`}
                />
            </form>
            <div className="text-center">
                <div className={`mb-4 ${darkMode ? 'text-yellow-500' : 'text-gray-700'}`}>
                    <span>Don't have an account?</span>
                    <Link to="/" className={`${darkMode ? 'text-blue-500' : 'text-blue-700'} ml-1`}>Create one here</Link>
                </div>
            </div>
        </BaseComponent>
    );
};

export default LoginAccount;
