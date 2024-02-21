import React, { useState, useEffect } from 'react';
import BaseComponent from './BaseComponent';
import { useDarkMode } from '../Context/DarkModeContext';

const ShowResultsComponent = () => {
  const [results, setResults] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Fetch results from the database and set them in state
    // For simplicity, I'm initializing with dummy data
    const dummyResults = [
      { id: 1, score: 3, user: 'User1' },
      { id: 2, score: 2, user: 'User2' },
      { id: 3, score: 4, user: 'User3' },
      // Add more results as needed
    ];

    setResults(dummyResults);
  }, []);

  return (
    <BaseComponent>
      <h1 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-green-400' : 'text-purple-600'}`}>Quiz Results</h1>
      <ul className="space-y-4">
        {results.map((result) => (
          <li key={result.id} className="border rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">
              User: {result.user}, Score: {result.score}
            </h2>
          </li>
        ))}
      </ul>
    </BaseComponent>
  );
};

export default ShowResultsComponent;
