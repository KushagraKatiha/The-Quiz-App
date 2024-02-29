import React, { useState, useEffect } from 'react';
import BaseComponent from './BaseComponent';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowQuestionsComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { testId } = useParams();

  const showToast = (message, type = 'info') => {
    toast(message, { type });
  };

  useEffect(() => {
    setLoading(true);
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
      setQuestions(questionArr);  // Set the state here
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
      showToast('Error fetching questions', 'error');
    })
    .finally(() => {
      setLoading(false);
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
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer === question.correctOption) {
        newResult += 1;
      }
    });
    setResult(newResult);
  };

  const handleSaveResults = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:9090/questions/addResult', {
        score: result,
        maxScore: questions.length
      }, { withCredentials: true });
      showToast('Results saved to the database!', 'success');
    } catch (err) {
      console.error(err.message);
      showToast('Failed to save results', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    handleCheckAnswers();
    setShowResults(true);
  };

  const handleDone = () => {
    navigate('/student-option-page');
  };

  return (
    <BaseComponent>
      <h1 className="text-4xl font-bold text-center mb-4">Question List</h1>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      )}
      {!loading && (
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
                        value={index + 1}
                        checked={userAnswers[question.id] === index + 1}
                        onChange={() => handleOptionChange(question.id, index + 1)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={showResults ? handleSaveResults : handleFinish}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showResults ? 'Save Results' : 'Finish'}
        </button>
        {showResults && (
          <button
            type="button"
            onClick={handleDone}
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Done
          </button>
        )}
      </div>
      {showResults && (
        <p className="text-center mt-4">
          Result: {result} out of {questions.length}
        </p>
      )}

      {/* Toast Container for displaying popups */}
      <ToastContainer />
    </BaseComponent>
  );
};

export default ShowQuestionsComponent;
