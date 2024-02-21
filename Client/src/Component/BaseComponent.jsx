import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Switch from 'react-switch';
import { useDarkMode } from '../Context/DarkModeContext';
import { Outlet } from 'react-router-dom';


// 
const BaseComponent = ({ children }) => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    // const [darkMode, setDarkMode] = useState(false);

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1000 },
    });

    const switchStyles = useSpring({
        transform: darkMode ? 'translateX(24px)' : 'translateX(0)',
    });

    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // };

    return (
        <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
            {/* Left Side */}
            <animated.div className="w-1/2 p-8 space-y-4" style={fadeIn}>
                {children}
            </animated.div>

            {/* Right Side */}
            <animated.div className="w-1/2 p-8" style={fadeIn}>
                <img src="vite.svg" alt="App Screenshot" className="w-full h-auto rounded-md" />
            </animated.div>

            {/* Dark Mode Switch */}
            <animated.div
                className="fixed bottom-4 right-4"
                style={{
                    ...switchStyles,
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 999,
                }}
            >
                <Switch
                    onChange={toggleDarkMode}
                    checked={darkMode}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                />
            </animated.div>
        </div>
    );
};

export default BaseComponent;
