import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.post('https://peoplemanager.nexustech.net.br/chamados_auth/user-info.php', {}, {
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
      message.error('Invalid token or failed to fetch user info');
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
