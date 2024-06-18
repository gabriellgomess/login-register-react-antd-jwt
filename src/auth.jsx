import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/auth/user-info.php`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setUser({ token, info: response.data.user });
      } else {
        throw new Error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      logout();
    }
  };

  const login = async (token) => {
    try {
      await fetchUserInfo(token);
      localStorage.setItem('token', token);
    } catch (e) {
      console.error('Login error:', e);
      toast({
        title: 'Falha no login',
        description: 'Token inválido ou expirado. Por favor, faça login novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
