import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useSpring, animated } from 'react-spring';
// import Switch from 'react-switch';
import BaseComponent from './BaseComponent';
import { useDarkMode } from '../Context/DarkModeContext';

const LoginAccount = () => {
    const { darkMode } = useDarkMode();
    // const [darkMode, setDarkMode] = useState(false);

    return (
        <BaseComponent>
            <h1 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-green-400' : 'text-purple-600'}`}>The Quiz App</h1>
            <form className="flex-col space-y-4">
                <input type="text" placeholder="Email" className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`} />
                <input type="password" placeholder="Password" className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`} />
                <input
                    type="button"
                    value="Login"
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
