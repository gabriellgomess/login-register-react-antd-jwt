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
  useToast,
  useBreakpointValue,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';

const CentroDeCustoForm = ({ centrosDeCusto, fetchCentrosDeCusto }) => {
  const [codigoCentroDeCusto, setCodigoCentroDeCusto] = useState('');
  const [nomeCentroDeCusto, setNomeCentroDeCusto] = useState('');
  const [descricaoCentroDeCusto, setDescricaoCentroDeCusto] = useState('');
  const [editIndexCentro, setEditIndexCentro] = useState(null);
  const toast = useToast();

  const handleSubmitCentroDeCusto = async (e) => {
    e.preventDefault();

    const centroDeCusto = { codigo: codigoCentroDeCusto, descricao: descricaoCentroDeCusto, nome: nomeCentroDeCusto };

    try {
      if (editIndexCentro !== null) {
        await axios.put(`https://chamados.nexustech.net.br/api_chamados/centros_de_custo/update.php`, {
          id: centrosDeCusto[editIndexCentro].id,
          ...centroDeCusto
        });
        toast({
          title: 'Centro de custo atualizado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        await axios.post('https://chamados.nexustech.net.br/api_chamados/centros_de_custo/create.php', centroDeCusto);
        fetchCentrosDeCusto();
        toast({
          title: 'Centro de custo adicionado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
      fetchCentrosDeCusto();
    } catch (error) {
      console.error('Erro ao salvar centro de custo', error);
    }

    setCodigoCentroDeCusto('');
    setNomeCentroDeCusto('');
    setDescricaoCentroDeCusto('');
    setEditIndexCentro(null);
  };

  const handleEditCentroDeCusto = (index) => {
    setEditIndexCentro(index);
    setNomeCentroDeCusto(centrosDeCusto[index].nome);
    setCodigoCentroDeCusto(centrosDeCusto[index].codigo);
    setDescricaoCentroDeCusto(centrosDeCusto[index].descricao);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <form onSubmit={handleSubmitCentroDeCusto}>
        <FormControl id="codigoCentroDeCusto" isRequired>
          <FormLabel>Código do Centro de Custo</FormLabel>
          <Input
            value={codigoCentroDeCusto}
            onChange={(e) => setCodigoCentroDeCusto(e.target.value)}
            placeholder="Código do Centro de Custo"
          />
        </FormControl>
        <FormControl id="nomeCentroDeCusto" isRequired mt={4}>
          <FormLabel>Nome do Centro de Custo</FormLabel>
          <Input
            value={nomeCentroDeCusto}
            onChange={(e) => setNomeCentroDeCusto(e.target.value)}
            placeholder="Nome do Centro de Custo"
          />
        </FormControl>

        <FormControl id="descricaoCentroDeCusto" isRequired mt={4}>
          <FormLabel>Descrição do Centro de Custo</FormLabel>
          <Input
            value={descricaoCentroDeCusto}
            onChange={(e) => setDescricaoCentroDeCusto(e.target.value)}
            placeholder="Descrição do Centro de Custo"
          />
        </FormControl>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button type="submit" colorScheme="teal" mt={4}>
            {editIndexCentro !== null ? 'Editar Centro de Custo' : 'Adicionar Centro de Custo'}
          </Button>
          {editIndexCentro !== null && (
            <Button
              type="button"
              colorScheme="red"
              variant='outline'
              mt={4}
              onClick={() => {
                setEditIndexCentro(null);
                setNomeCentroDeCusto('');
                setCodigoCentroDeCusto('');
                setDescricaoCentroDeCusto('');
              }}
            >
              Cancelar
            </Button>)}
        </div>

      </form>
      {isMobile ? (
        <VStack mt={8} spacing={4} align="stretch">
          {centrosDeCusto.map((centro, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Código:</Text>
                <Text>{centro.codigo}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Nome:</Text>
                <Text>{centro.nome}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Descrição:</Text>
                <Text>{centro.descricao}</Text>
              </HStack>
              <Button size="sm" onClick={() => handleEditCentroDeCusto(index)} mt={2}>Editar</Button>
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
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {centrosDeCusto.map((centro, index) => (
              <Tr key={index}>
                <Td>{centro.codigo}</Td>
                <Td>{centro.nome}</Td>
                <Td>{centro.descricao}</Td>
                <Td>
                  <Button size="sm" onClick={() => handleEditCentroDeCusto(index)}>Editar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default CentroDeCustoForm;
