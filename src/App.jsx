// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth';
import Home from './pages/Home';
import Chamados from './pages/Chamados';
import AberturaChamado from './pages/AberturaChamado';
import Configuracoes from './pages/Configuracoes';
import ProtectedLayout from './components/ProtectedLayout';
import { ChakraProvider } from '@chakra-ui/react';
import './fonts.css';
import theme from './theme';


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <ProtectedLayout>{children}</ProtectedLayout> : <Navigate to="/" />;
};

const App = () => (
  <ChakraProvider theme={theme}> {/* Envolva o App com ChakraProvider */}
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chamados" element={<ProtectedRoute><Chamados /></ProtectedRoute>} />
        <Route path="/abertura-chamado" element={<ProtectedRoute><AberturaChamado /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  </ChakraProvider>
);

export default App;
