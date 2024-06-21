import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  useToast,
} from '@chakra-ui/react';

const AtendenteForm = ({ centrosDeCusto, setores, atendentes, fetchAtendentes }) => {
  const [nomeAtendente, setNomeAtendente] = useState('');
  const [emailAtendente, setEmailAtendente] = useState('');
  const [telefoneAtendente, setTelefoneAtendente] = useState('');
  const [editIndexAtendente, setEditIndexAtendente] = useState(null);
  const toast = useToast();

  const handleSubmitAtendente = async (e) => {
    e.preventDefault();

    const novoAtendente = { nome: nomeAtendente, email: emailAtendente, telefone: telefoneAtendente };

    try {
      if (editIndexAtendente !== null) {
        await axios.put(`https://chamados.nexustech.net.br/api_chamados/atendentes/update.php`, {
          id: atendentes[editIndexAtendente].id,
          ...novoAtendente
        });
        toast({
          title: 'Atendente atualizado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        await axios.post('https://chamados.nexustech.net.br/api_chamados/atendentes/create.php', novoAtendente);
        toast({
          title: 'Atendente adicionado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
      fetchAtendentes();
    } catch (error) {
      console.error('Erro ao salvar atendente', error);
    }

    setNomeAtendente('');
    setEmailAtendente('');
    setTelefoneAtendente('');
    setEditIndexAtendente(null);
  };

  const handleEditAtendente = (index) => {
    setEditIndexAtendente(index);
    setNomeAtendente(atendentes[index].nome);
    setEmailAtendente(atendentes[index].email);
    setTelefoneAtendente(atendentes[index].telefone);
  };

  return (
    <Box>
      <form onSubmit={handleSubmitAtendente}>
        <FormControl id="nomeAtendente" isRequired>
          <FormLabel>Nome do Atendente</FormLabel>
          <Input
            value={nomeAtendente}
            onChange={(e) => setNomeAtendente(e.target.value)}
            placeholder="Nome do Atendente"
          />
        </FormControl>

        <FormControl id="emailAtendente" isRequired mt={4}>
          <FormLabel>Email do Atendente</FormLabel>
          <Input
            value={emailAtendente}
            onChange={(e) => setEmailAtendente(e.target.value)}
            placeholder="Email do Atendente"
          />
        </FormControl>

        <FormControl id="telefoneAtendente" isRequired mt={4}>
          <FormLabel>Telefone do Atendente</FormLabel>
          <Input
            value={telefoneAtendente}
            onChange={(e) => setTelefoneAtendente(e.target.value)}
            placeholder="Telefone do Atendente"
          />
        </FormControl>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button type="submit" colorScheme="teal" mt={4}>
            {editIndexAtendente !== null ? 'Editar Atendente' : 'Adicionar Atendente'}
          </Button>
          {editIndexAtendente !== null && (
            <Button
              type="button"
              colorScheme="red"
              variant='outline'
              mt={4}
              onClick={() => {
                setEditIndexAtendente(null);
                setNomeAtendente('');
                setEmailAtendente('');
                setTelefoneAtendente('');
              }}
            >
              Cancelar
            </Button>)}
        </div>
      </form>
      <Table variant="simple" mt={8}>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Telefone</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {atendentes.map((at, index) => (
            <Tr key={index}>
              <Td>{at.nome}</Td>
              <Td>{at.email}</Td>
              <Td>{at.telefone}</Td>
              <Td>
                <Button size="sm" onClick={() => handleEditAtendente(index)}>Editar</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AtendenteForm;
