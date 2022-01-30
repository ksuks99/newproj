import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import EditNotesPage from './pages/EditNotesPage.jsx';

// Routes должен быть внутри тега Router иначе ошибка
// Uncaught Error: useRoutes() may be used only in the context of a <Router> component.
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      {/* <Route path="register" element={<RegisterPage />} /> */}
      <Route path="notes" element={<EditNotesPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <div className="outer">
      <AppRoutes />
    </div>
  )
}