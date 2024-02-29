import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseComponent from "./BaseComponent";
import { useDarkMode } from "../Context/DarkModeContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentOptionPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = "info") => {
    toast(message, { type });
  };

  const handleViewTests = async () => {
    navigate("/view-tests");
  };

  const handleViewResults = async () => {
    navigate("/view-results", { state: { from: "student-option-page" } });
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:9090/logout", {
        withCredentials: true,
      });
      showToast("User Logged Out", "success");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      showToast("Failed to logout", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.delete("http://localhost:9090/delete-account", {
        withCredentials: true,
      });
      showToast("Account Deleted", "success");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      showToast("Failed to delete account", "error");
    } finally {
      setLoading(false);
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
          value="View Tests"
          onClick={handleViewTests}
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
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-10 ${
            darkMode ? "hover:bg-blue-700" : "hover:bg-blue-400"
          }`}
        />

        <input
          type="button"
          value="Delete Account"
          onClick={handleDeleteAccount}
          disabled={loading}
          className={`bg-red-500 text-white px-4 py-2 rounded-md mt-10 ${
            darkMode ? "hover:bg-red-700" : "hover:bg-red-400"
          }`}
        />
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
          <div className="border-t-4 border-blue-500 rounded-full h-12 w-12 animate-spin"></div>
        </div>
      )}

      {/* Toast Container for displaying popups */}
      <ToastContainer />
    </BaseComponent>
  );
};

export default StudentOptionPage;
