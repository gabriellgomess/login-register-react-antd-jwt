import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Defina a URL base do axios
  axios.defaults.baseURL = 'https://peoplemanager.nexustech.net.br/chamados_auth';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register.php', { name, email, password });
      if(response.data.success){
        message.success(response.data.message);
        navigate('/login');
      }else{
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="primary" onClick={handleRegister}>Register</Button>
    </div>
  );
};

export default Register;
