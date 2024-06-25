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
  useBreakpointValue,
  VStack,
  HStack,
  Text,
  Flex
} from '@chakra-ui/react';

const SetorForm = ({ centrosDeCusto, setores, fetchSetores }) => {
  const [codigoSetor, setCodigoSetor] = useState('');
  const [nomeSetor, setNomeSetor] = useState('');
  const [descricaoSetor, setDescricaoSetor] = useState('');
  const [centroDeCustoId, setCentroDeCustoId] = useState('');
  const [editIndexSetor, setEditIndexSetor] = useState(null);
  const toast = useToast();

  const handleSubmitSetor = async (e) => {
    e.preventDefault();

    const setor = { codigo: codigoSetor, descricao: descricaoSetor, centro_de_custo_id: centroDeCustoId, nome: nomeSetor };

    try {
      if (editIndexSetor !== null) {
        await axios.put(`https://chamados.nexustech.net.br/api_chamados/setores/update.php`, {
          id: setores[editIndexSetor].id,
          ...setor
        });
        toast({
          title: 'Setor atualizado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        await axios.post('https://chamados.nexustech.net.br/api_chamados/setores/create.php', setor);
        toast({
          title: 'Setor adicionado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
      fetchSetores();
    } catch (error) {
      console.error('Erro ao salvar setor', error);
    }

    setCodigoSetor('');
    setNomeSetor('');
    setDescricaoSetor('');
    setCentroDeCustoId('');
    setEditIndexSetor(null);
  };

  const handleEditSetor = (index) => {
    setEditIndexSetor(index);
    setNomeSetor(setores[index].nome);
    setCodigoSetor(setores[index].codigo);
    setDescricaoSetor(setores[index].descricao);
    setCentroDeCustoId(setores[index].centro_de_custo_id);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <form onSubmit={handleSubmitSetor}>
        <Flex justifyContent="space-between" gap="20px" flexDirection={isMobile?"column":"row"}>
          <FormControl id="codigoSetor" isRequired width={isMobile?"100%":"20%"}>
            <FormLabel>Código</FormLabel>
            <Input
              value={codigoSetor}
              onChange={(e) => setCodigoSetor(e.target.value)}
              placeholder="Código"
            />
          </FormControl>
          <FormControl id="nomeSetor" isRequired width={isMobile?"100%":"80%"}>
            <FormLabel>Nome do Setor</FormLabel>
            <Input
              value={nomeSetor}
              onChange={(e) => setNomeSetor(e.target.value)}
              placeholder='Nome do Setor'
            />
          </FormControl>
        </Flex>
        <FormControl id="descricaoSetor" isRequired mt={4}>
          <FormLabel>Descrição do Setor</FormLabel>
          <Input
            value={descricaoSetor}
            onChange={(e) => setDescricaoSetor(e.target.value)}
            placeholder="Descrição do Setor"
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
                {centro.nome}
              </option>
            ))}
          </Select>
        </FormControl>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button type="submit" colorScheme="teal" mt={4}>
            {editIndexSetor !== null ? 'Editar Setor' : 'Adicionar Setor'}
          </Button>
          {editIndexSetor !== null && (
            <Button
              type="button"
              colorScheme="red"
              variant='outline'
              mt={4}
              onClick={() => {
                setEditIndexSetor(null);
                setCodigoSetor('');
                setNomeSetor('');
                setDescricaoSetor('');
                setCentroDeCustoId('');
              }}
            >
              Cancelar
            </Button>)}
        </div>

      </form>
      {isMobile ? (
        <VStack mt={8} spacing={4} align="stretch">
          {setores.map((setor, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Código:</Text>
                <Text>{setor.codigo}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Nome:</Text>
                <Text>{setor.nome}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Centro de Custo:</Text>
                <Text>{centrosDeCusto.find(centro => centro.id === setor.centro_de_custo_id)?.nome || ''}</Text>
              </HStack>
              <Button size="sm" onClick={() => handleEditSetor(index)} mt={2}>Editar</Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Table variant="simple" mt={8}>
          <Thead>
            <Tr>
              <Th>Código</Th>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Centro de Custo</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {setores.map((setor, index) => (
              <Tr key={index}>
                <Td>{setor.codigo}</Td>
                <Td>{setor.nome}</Td>
                <Td>{setor.descricao}</Td>
                <Td>{centrosDeCusto.find(centro => centro.id === setor.centro_de_custo_id)?.descricao || ''}</Td>
                <Td>
                  <Button size="sm" onClick={() => handleEditSetor(index)}>Editar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default SetorForm;
