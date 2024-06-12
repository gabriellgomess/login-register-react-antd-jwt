import React, { useState } from 'react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://peoplemanager.nexustech.net.br/chamados_auth/login.php', { email, password });      
      if (response.data.token) {
        await login(response.data.token);
        navigate('/page1');
      } else {
        message.error(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error.response || error.message);
      message.error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="primary" onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
