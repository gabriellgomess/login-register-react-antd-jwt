import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth';
import Home from './pages/Home';
import Page1 from './pages/Chamados';
import Page2 from './pages/AberturaChamado';
import ProtectedLayout from './components/ProtectedLayout';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <ProtectedLayout>{children}</ProtectedLayout> : <Navigate to="/" />;
};

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page1" element={<ProtectedRoute><Page1 /></ProtectedRoute>} />
      <Route path="/page2" element={<ProtectedRoute><Page2 /></ProtectedRoute>} />
    </Routes>
  </AuthProvider>
);

export default App;
