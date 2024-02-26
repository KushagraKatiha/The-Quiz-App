import React, { useState, useEffect } from 'react';
import BaseComponent from './BaseComponent';
import { useDarkMode } from '../Context/DarkModeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvailableTests = () => {
const { darkMode } = useDarkMode();
const [testId, setTestId] = useState("");
const [tests, setTests] = useState([]);

const navigate = useNavigate();

useEffect(() => {
  // Fetch questions from an API or database and set them in state
   axios.get("http://localhost:9090/questions/availableTests")
  .then((response)=>{
    console.log(response.data.teachers);
    setTests(response.data.teachers)
  })
  .catch((err)=>{
    console.log("Error encountered: ", err);
  })

}, []);

const handleAttemptTest = async ()=>{
  navigate(`/view-question/${testId}`)    
}

  return (
    <BaseComponent>
      <h1 className="text-4xl font-bold text-center mb-4">Available Tests</h1>
      <form className="flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Enter Test Id"
                    value={testId}
                    onChange={(e) => setTestId(e.target.value)}
                    className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                />
                <input
                    type="button"
                    value="Attempt Test"
                    onClick={handleAttemptTest}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-400'}`}
                />
            </form>
      <ul className="space-y-4">
        {tests.map((test) => (
          <li key={test.testId} className="border rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">Teacher's Name: {test.name}</h2>
            <h2 className="text-lg font-semibold mb-2">TestId: {test.testId}</h2>
          </li>
        ))}
      </ul>
    </BaseComponent>
  );
};

export default AvailableTests;
