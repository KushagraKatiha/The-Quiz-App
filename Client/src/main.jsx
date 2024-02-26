import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import CreateAccount from './Component/CreateAccount.jsx'
import LoginAccount from './Component/LoginAccount.jsx'
import AddQuestionComponent from './Component/AddQuestionComponent.jsx'
import { DarkModeProvider } from './Context/DarkModeContext.jsx';
import ShowQuestionsComponent from './Component/ShowQuestionComponent.jsx'
import App from './App.jsx'
import ViewResults from './Component/ViewResults.jsx'
import TeacherOptionPage from './Component/TeacherOptionPage.jsx'
import StudentOptionPage from './Component/StudentOptionPage.jsx'
import AvailableTests from './Component/AvailableTests.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} >
          <Route path = "/" element={<CreateAccount/>} />
          <Route path="/login-account" element={<LoginAccount/>} />
          <Route path="/teacher-option-page" element={<TeacherOptionPage/>} />
          <Route path="/student-option-page" element={<StudentOptionPage/>} />
          <Route path="/add-question" element={<AddQuestionComponent/>} />
          <Route path="/view-tests" element={<AvailableTests/>}/>
          <Route path="/view-question/:testId" element={<ShowQuestionsComponent/>} />
          <Route path="/view-results" element={<ViewResults/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router} />  
    </DarkModeProvider>
  </React.StrictMode>,
)
