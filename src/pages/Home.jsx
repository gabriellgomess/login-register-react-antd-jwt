import React, { useState } from 'react';
import { Button, Input, message, Card } from 'antd';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Defina a URL base do axios
  axios.defaults.baseURL = 'https://peoplemanager.nexustech.net.br/chamados_auth';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login.php', { email, password });
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

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register.php', { name, email, password });
      if(response.data.success){
        message.success(response.data.message);
        setIsLogin(true);
      }else{
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 400 }}>
        {isLogin ? (
          <>
            <h1>Login Page</h1>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="primary" onClick={handleLogin} style={{ marginTop: 16 }}>Login</Button>
            <p style={{ marginTop: 16 }}>
              Ainda não tem uma conta? <a onClick={() => setIsLogin(false)}>Registrar-se</a>
            </p>
          </>
        ) : (
          <>
            <h1>Register Page</h1>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="primary" onClick={handleRegister} style={{ marginTop: 16 }}>Register</Button>
            <p style={{ marginTop: 16 }}>
              Já tem uma conta? <a onClick={() => setIsLogin(true)}>Login</a>
            </p>
          </>
        )}
      </Card>
    </div>
  );
};

export default Home;
