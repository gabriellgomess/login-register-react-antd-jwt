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

const AtendenteForm = ({ centrosDeCusto, setores, atendente, fetchAtendente }) => {
  const [nomeAtendente, setNomeAtendente] = useState('');
  const [emailAtendente, setEmailAtendente] = useState('');
  const [centroDeCustoId, setCentroDeCustoId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [editIndexAtendente, setEditIndexAtendente] = useState(null);
  const toast = useToast();

  const handleSubmitAtendente = async (e) => {
    e.preventDefault();

    const novoAtendente = { nome: nomeAtendente, email: emailAtendente, centro_de_custo_id: centroDeCustoId, setor_id: setorId };

    try {
      if (editIndexAtendente !== null) {
        await axios.put(`https://chamados.nexustech.net.br/api_chamados/update_atendente.php?id=${atendente[editIndexAtendente].id}`, novoAtendente);
        toast({
          title: 'Atendente atualizado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        const response = await axios.post('https://chamados.nexustech.net.br/api_chamados/post_atendente.php', novoAtendente);
        fetchAtendente();
        toast({
          title: 'Atendente adicionado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
      fetchAtendente();
    } catch (error) {
      console.error('Erro ao salvar atendente', error);
    }

    setNomeAtendente('');
    setEmailAtendente('');
    setCentroDeCustoId('');
    setSetorId('');
    setEditIndexAtendente(null);
  };

  const handleEditAtendente = (index) => {
    setEditIndexAtendente(index);
    setNomeAtendente(atendente[index].nome);
    setEmailAtendente(atendente[index].email);
    setCentroDeCustoId(atendente[index].centro_de_custo_id);
    setSetorId(atendente[index].setor_id);
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

        <FormControl id="centroDeCustoId" isRequired mt={4}>
          <FormLabel>Centro de Custo</FormLabel>
          <Select
            placeholder="Selecione o Centro de Custo"
            value={centroDeCustoId}
            onChange={(e) => setCentroDeCustoId(e.target.value)}
          >
            {centrosDeCusto.map((centro) => (
              <option key={centro.id} value={centro.id}>
                {centro.descricao}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="setorId" isRequired mt={4}>
          <FormLabel>Setor</FormLabel>
          <Select
            placeholder="Selecione o Setor"
            value={setorId}
            onChange={(e) => setSetorId(e.target.value)}
          >
            {setores.map((setor) => (
              <option key={setor.id} value={setor.id}>
                {setor.descricao}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="teal" mt={4}>
          {editIndexAtendente !== null ? 'Editar Atendente' : 'Adicionar Atendente'}
        </Button>
      </form>
      <Table variant="simple" mt={8}>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Centro de Custo</Th>
            <Th>Setor</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {atendente.map((at, index) => (
            <Tr key={index}>
              <Td>{at.nome}</Td>
              <Td>{at.email}</Td>
              <Td>{centrosDeCusto.find(centro => centro.id === at.centro_de_custo_id)?.descricao || ''}</Td>
              <Td>{setores.find(setor => setor.id === at.setor_id)?.descricao || ''}</Td>
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
