import React, { useState, useEffect } from 'react';
import BaseComponent from './BaseComponent';

const ShowQuestionsComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(0);

  useEffect(() => {
    // Fetch questions from an API or database and set them in state
    // For simplicity, I'm initializing with dummy data
    const dummyQuestions = [
      {
        id: 1,
        questionText: 'What is your favorite color?',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        correctOption: 2, // Index of the correct option
      },
      {
        id: 2,
        questionText: 'What is the capital of France?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctOption: 1, // Index of the correct option
      },
      // Add more questions as needed
    ];

    setQuestions(dummyQuestions);
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleCheckAnswers = () => {
    let newResult = 0;

    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer === question.correctOption) {
        newResult += 1;
      }
    });

    setResult(newResult);
  };

  return (
    <BaseComponent>
      <h1 className="text-4xl font-bold text-center mb-4">Question List</h1>
      <ul className="space-y-4">
        {questions.map((question) => (
          <li key={question.id} className="border rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">{question.questionText}</h2>
            <ul className="list-disc ml-6">
              {question.options.map((option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={index}
                      checked={userAnswers[question.id] === index}
                      onChange={() => handleOptionChange(question.id, index)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handleCheckAnswers}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Check Answers
        </button>
      </div>
      <p className="text-center mt-4">
        Result: {result} out of {questions.length}
      </p>
    </BaseComponent>
  );
};

export default ShowQuestionsComponent;
