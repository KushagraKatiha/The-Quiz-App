import React, { useState, useEffect } from 'react';
import BaseComponent from './BaseComponent';
import { useNavigate } from 'react-router-dom';

const ViewResults = () => {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

  function handleDone(){
    if(document.referrer === "http://localhost:9090/add-question"){
      navigate('/teacher-option-page');
  }else{
    navigate('/student-option-page');
  }
  }

  useEffect(() => {
    // Fetch questions from an API or database and set them in state
    // For simplicity, I'm initializing with dummy data
    const dummyResults = [
      {
       score: 5,
       user:{
            name: "John Doe",
            email: "john@ac.in"
       }
      },
      {
        score: 10,
        user:{
             name: "John Doe 2",
             email: "john2@ac.in"
        }
      },
      // Add more questions as needed
    ];

    setResults(dummyResults);
  }, []);

  return (
    <BaseComponent>
      <h1 className="text-4xl font-bold text-center mb-4">Result List</h1>
      <ul className="space-y-4">
        {results.map((result) => (
          <li key={result.score} className="border rounded-md p-4">
            <h1 className="text-xl font-semibold mb-2">Marks: {result.score}</h1>
            <h2 className="text-lg font-semibold mb-2">Student's Name: {result.user.name}</h2>
            <h2 className="text-lg font-semibold mb-2">Student's Email: {result.user.email}</h2>
          </li>
        ))}
      </ul>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handleDone}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </BaseComponent>
  );

  };

  

export default ViewResults;
