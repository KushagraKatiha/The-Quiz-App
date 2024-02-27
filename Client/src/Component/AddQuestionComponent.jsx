import React, { useState } from 'react';
import BaseComponent from './BaseComponent';
import { useDarkMode } from '../Context/DarkModeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuestionComponent = () => {
  const { darkMode } = useDarkMode();
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = async () => {
      try {
        const response = await axios.post('http://localhost:9090/questions/add', {
          questionText: questionText,
          option: options,
          correctOption: correctOption
        }, {
          withCredentials: true
        });

        if (response.status === 201) {
          alert('Question Added');
          setQuestionText('');
          setOptions(["", "", "", ""]);
          setCorrectOption('');
          setQuestionsAdded(questionsAdded + 1);
          console.log(questionsAdded);
        }

        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
  };

  const handleDone = ()=>{
    navigate('/teacher-option-page')
  }

  return (
    <BaseComponent>
      <h1 className="text-4xl font-bold text-center mb-4">Add Question</h1>
      <form className="flex-col space-y-4">
        <textarea
          placeholder="Question Text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
          />
        ))}
        <input
          type="number"
          min={1}
          max={4}
          placeholder="Correct Option Number"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
        />
        <button
          type="button"
          onClick={handleAddQuestion}
          className={`bg-green-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-green-700' : 'hover:bg-green-400'}`}
        >
          Add Question
        </button>

        <button
          type="button"
          onClick={handleDone}
          className={`bg-green-500 text-white px-4 py-2 rounded-md ${darkMode ? 'hover:bg-green-700' : 'hover:bg-green-400'}`}
        >
          Done
        </button>
      </form>
    </BaseComponent>
  );
};

export default AddQuestionComponent;
