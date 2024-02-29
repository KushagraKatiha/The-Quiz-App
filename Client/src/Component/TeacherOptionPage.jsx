import React from "react";
import { useNavigate } from "react-router-dom";
import BaseComponent from "./BaseComponent";
import { useDarkMode } from "../Context/DarkModeContext";
import axios from 'axios';

const TeacherOptionPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:9090/logout',{
        withCredentials: true
      });
      console.log(response.data);
      alert('User Logged Out')
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddQuestions = async () => {
    navigate("/add-question");
  };

  const handleViewResults = async () => {
    navigate("/view-results", {state: {from: "teacher-option-page"}});
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:9090/delete-account',{
        withCredentials: true
      });
      if(response.data.status === 200){
        alert('Account Deleted');
        navigate('/');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <BaseComponent>
      <h1
        className={`text-4xl font-bold text-center mb-4 ${
          darkMode ? "text-green-400" : "text-purple-600"
        }`}
      >
        The Quiz App
      </h1>
      <form className="flex flex-row justify-evenly">
        <input
          type="button"
          value="Add Questions"
          onClick={handleAddQuestions}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-10 ${
            darkMode ? "hover:bg-blue-700" : "hover:bg-blue-400"
          }`}
        />

        <input
          type="button"
          value="View Results"
          onClick={handleViewResults}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-10 ${
            darkMode ? "hover:bg-blue-700" : "hover:bg-blue-400"
          }`}
        />

        <input
          type="button"
          value="Logout"
          onClick={handleLogout}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-10 ${
            darkMode ? "hover:bg-blue-700" : "hover:bg-blue-400"
          }`}
        />

        <input
          type="button"
          value="Delete Account"
          onClick={handleDeleteAccount}
          className={`bg-red-500 text-white px-4 py-2 rounded-md mt-10 ${
            darkMode ? "hover:bg-red-700" : "hover:bg-red-400"
          }`}
        />
      </form>
    </BaseComponent>
  );
};

export default TeacherOptionPage;
