import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import CreateAccount from './Component/CreateAccount.jsx'
import LoginAccount from './Component/LoginAccount.jsx'
import { DarkModeProvider } from './Context/DarkModeContext.jsx';
import App from './App.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} >
          <Route path = "/" element={<CreateAccount/>} />
          <Route path="/login-account" element={<LoginAccount/>} />
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
