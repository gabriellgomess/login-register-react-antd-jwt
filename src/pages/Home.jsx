import React, { useState } from 'react';
import { Button, Input, InputGroup, InputRightElement, useToast, Box, Text } from '@chakra-ui/react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo/logo_vertical.png';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Defina a URL base do axios
  axios.defaults.baseURL = `${import.meta.env.VITE_URL}/auth`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login.php', { email, password });
      if (response.data.token) {
        await login(response.data.token);
        navigate('/chamados');
      } else {
        toast({
          title: 'Erro',
          description: response.data.message || 'Invalid credentials',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error.response || error.message);
      toast({
        title: 'Erro',
        description: error.response?.data?.message || 'Invalid credentials',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register.php', { name, email, password });
      if (response.data.success) {
        toast({
          title: 'Parabéns',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setIsLogin(true);
      } else {
        toast({
          title: 'Erro',
          description: response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: error.response?.data?.message || 'Registration failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <img width={400} src={Logo} alt="" />
      
      <Box width={400} p={4} borderWidth={1} borderRadius="md" boxShadow="lg">        
        {isLogin ? (
          <>
            <Text fontSize="2xl" mb={4}>Acessar</Text>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} mb={2} />
            <InputGroup size="md" mb={4}>
              <Input
                pr="4.5rem"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Button colorScheme="teal" onClick={handleLogin} width="full">Login</Button>
            <Text mt={4}>
              Ainda não tem uma conta? <Button variant="link" colorScheme="teal" onClick={() => setIsLogin(false)}>Registrar-se</Button>
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="2xl" mb={4}>Registrar</Text>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} mb={2} />
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} mb={2} />
            <InputGroup size="md" mb={4}>
              <Input
                pr="4.5rem"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Button colorScheme="teal" onClick={handleRegister} width="full">Register</Button>
            <Text mt={4}>
              Já tem uma conta? <Button variant="link" colorScheme="teal" onClick={() => setIsLogin(true)}>Login</Button>
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
