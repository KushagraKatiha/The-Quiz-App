import React, { useState, useEffect } from 'react';
import BaseComponent from './BaseComponent';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShowQuestionsComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(0);

  const { testId } = useParams();

  useEffect(() => {
    axios.post('http://localhost:9090/questions/show', {
      testId: testId
    })
    .then((response) => {
      const questionArr = response.data.questions.map(question => ({
        id: question._id, // Assuming _id is the unique identifier for each question in MongoDB
        questionText: question.questionText,
        options: question.option,
        correctOption: question.correctOption
      }));
      console.log("question arr is: ", questionArr);
      setQuestions(questionArr);  // Set the state here
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
    });
  }, [testId]);

  useEffect(() => {
    console.log(`questions are: ${JSON.stringify(questions)}`);
  }, [questions]);
  

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleCheckAnswers = () => {
    let newResult = 0;
    console.log(result);
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer === question.correctOption) {
        newResult += 1;
      }
    });

    setResult(newResult);
  }

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
                      value={index+1}
                      checked={userAnswers[question.id] === index + 1}
                      onChange={() => handleOptionChange(question.id, index+1)}
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
