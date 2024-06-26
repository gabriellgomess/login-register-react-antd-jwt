import React, { useState, useEffect } from 'react';
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
  useBreakpointValue,
  VStack,
  HStack,
  Text,
  Flex,
  Switch,
} from '@chakra-ui/react';

const AtendenteForm = ({ centrosDeCusto, setores, atendentes, fetchAtendentes, usuarios }) => {  
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [nomeAtendente, setNomeAtendente] = useState('');
  const [emailAtendente, setEmailAtendente] = useState('');
  const [telefoneAtendente, setTelefoneAtendente] = useState('');
  const [centroDeCustoId, setCentroDeCustoId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [isGestor, setIsGestor] = useState(false);
  const [filteredSetores, setFilteredSetores] = useState(setores);
  const [editIndexAtendente, setEditIndexAtendente] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (centroDeCustoId) {
      setFilteredSetores(setores.filter(setor => setor.centro_de_custo_id === parseInt(centroDeCustoId)));
    } else {
      setFilteredSetores(setores);
    }
  }, [centroDeCustoId, setores]);

  useEffect(() => {
    if (setorId) {
      const setor = setores.find(setor => setor.id === parseInt(setorId));
      if (setor) {
        setCentroDeCustoId(setor.centro_de_custo_id);
      }
    }
  }, [setorId, setores]);  

  const handleUsuarioChange = (e) => {
    const usuarioId = e.target.value;
    const usuario = usuarios.find(u => u.id === parseInt(usuarioId));
    if (usuario) {
      setUsuarioSelecionado(usuario);
      setNomeAtendente(usuario.nome);
      setEmailAtendente(usuario.email);
      setTelefoneAtendente(usuario.telefone || '');
    } else {
      setUsuarioSelecionado(null);
      setNomeAtendente('');
      setEmailAtendente('');
      setTelefoneAtendente('');
    }
  };

  const handleSubmitAtendente = async (e) => {
    e.preventDefault();

    const novoAtendente = { nome: nomeAtendente, email: emailAtendente, telefone: telefoneAtendente, centro_de_custo_id: centroDeCustoId, setor_id: setorId, is_gestor: isGestor };

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

    setUsuarioSelecionado(null);
    setNomeAtendente('');
    setEmailAtendente('');
    setTelefoneAtendente('');
    setCentroDeCustoId('');
    setSetorId('');
    setIsGestor(false);
    setEditIndexAtendente(null);
  };

  const handleEditAtendente = (index) => {
    setEditIndexAtendente(index);
    setNomeAtendente(atendentes[index].nome);
    setEmailAtendente(atendentes[index].email);
    setTelefoneAtendente(atendentes[index].telefone);
    setCentroDeCustoId(atendentes[index].centro_de_custo_id);
    setSetorId(atendentes[index].setor_id);
    setIsGestor(atendentes[index].is_gestor);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <form onSubmit={handleSubmitAtendente}>
        <FormControl id="usuarioAtendente" isRequired>
          <FormLabel>Nome do Atendente</FormLabel>
          <Select
            placeholder="Selecione o Usuário"
            value={usuarioSelecionado ? usuarioSelecionado.id : ''}
            onChange={handleUsuarioChange}
          >
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </Select>
        </FormControl>
        <Flex mt={4} justifyContent="space-between" gap="20px" flexDirection={isMobile ? "column" : "row"}>
          <FormControl id="emailAtendente" isRequired width={isMobile ? "100%" : "50%"}>
            <FormLabel>Email do Atendente</FormLabel>
            <Input
              value={emailAtendente}
              onChange={(e) => setEmailAtendente(e.target.value)}
              placeholder="Email do Atendente"
              isReadOnly={usuarioSelecionado !== null}
            />
          </FormControl>

          <FormControl id="telefoneAtendente" isRequired width={isMobile ? "100%" : "50%"}>
            <FormLabel>Telefone do Atendente</FormLabel>
            <Input
              value={telefoneAtendente}
              onChange={(e) => setTelefoneAtendente(e.target.value)}
              placeholder="Telefone do Atendente"
              isReadOnly={usuarioSelecionado !== null}
            />
          </FormControl>
        </Flex>
        <FormControl id="centroDeCustoId" isRequired mt={4}>
          <FormLabel>Centro de Custo</FormLabel>
          <Select
            placeholder="Selecione o Centro de Custo"
            value={centroDeCustoId}
            onChange={(e) => setCentroDeCustoId(e.target.value)}
          >
            {centrosDeCusto.map((centro) => (
              <option key={centro.id} value={centro.id}>
                {centro.nome}
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
            {filteredSetores.map((setor) => (
              <option key={setor.id} value={setor.id}>
                {setor.nome}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="isGestor" mt={4}>
          <FormLabel>É Gestor?</FormLabel>
          <Switch
            isChecked={isGestor}
            onChange={(e) => setIsGestor(e.target.checked)}
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
                setUsuarioSelecionado(null);
                setNomeAtendente('');
                setEmailAtendente('');
                setTelefoneAtendente('');
                setCentroDeCustoId('');
                setSetorId('');
                setIsGestor(false);
                setEditIndexAtendente(null);
              }}
            >
              Cancelar
            </Button>)}
        </div>
      </form>
      {isMobile ? (
        <VStack mt={8} spacing={4} align="stretch">
          {atendentes.map((at, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Nome:</Text>
                <Text>{at.nome}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Email:</Text>
                <Text>{at.email}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Telefone:</Text>
                <Text>{at.telefone}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Centro de Custo:</Text>
                <Text>{at.centro_de_custo_nome}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Setor:</Text>
                <Text>{at.setor_nome}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">É Gestor:</Text>
                <Text>{at.is_gestor ? 'Sim' : 'Não'}</Text>
              </HStack>
              <Button size="sm" onClick={() => handleEditAtendente(index)} mt={2}>Editar</Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Table variant="simple" mt={8}>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Centro de Custo</Th>
              <Th>Setor</Th>
              <Th>É Gestor</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {atendentes.map((at, index) => (
              <Tr key={index}>
                <Td>{at.nome}</Td>
                <Td>{at.email}</Td>
                <Td>{at.telefone}</Td>
                <Td>{at.centro_de_custo_nome}</Td>
                <Td>{at.setor_nome}</Td>
                <Td>{at.is_gestor ? 'Sim' : 'Não'}</Td>
                <Td>
                  <Button size="sm" onClick={() => handleEditAtendente(index)}>Editar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default AtendenteForm;
