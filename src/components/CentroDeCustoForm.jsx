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
  useToast,
} from '@chakra-ui/react';

const CentroDeCustoForm = ({ centrosDeCusto, fetchCentrosDeCusto }) => {
  const [codigoCentroDeCusto, setCodigoCentroDeCusto] = useState('');
  const [descricaoCentroDeCusto, setDescricaoCentroDeCusto] = useState('');
  const [editIndexCentro, setEditIndexCentro] = useState(null);
  const toast = useToast();

  const handleSubmitCentroDeCusto = async (e) => {
    e.preventDefault();

    const centroDeCusto = { codigo: codigoCentroDeCusto, descricao: descricaoCentroDeCusto };

    try {
      if (editIndexCentro !== null) {
        await axios.put(`https://chamados.nexustech.net.br/api_chamados/update_centro_de_custo.php?id=${centrosDeCusto[editIndexCentro].id}`, centroDeCusto);
        toast({
          title: 'Centro de custo atualizado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        const response = await axios.post('https://chamados.nexustech.net.br/api_chamados/post_centro_de_custo.php', centroDeCusto);
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
    setDescricaoCentroDeCusto('');
    setEditIndexCentro(null);
  };

  const handleEditCentroDeCusto = (index) => {
    setEditIndexCentro(index);
    setCodigoCentroDeCusto(centrosDeCusto[index].codigo);
    setDescricaoCentroDeCusto(centrosDeCusto[index].descricao);
  };

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

        <FormControl id="descricaoCentroDeCusto" isRequired mt={4}>
          <FormLabel>Descrição do Centro de Custo</FormLabel>
          <Input
            value={descricaoCentroDeCusto}
            onChange={(e) => setDescricaoCentroDeCusto(e.target.value)}
            placeholder="Descrição do Centro de Custo"
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" mt={4}>
          {editIndexCentro !== null ? 'Editar Centro de Custo' : 'Adicionar Centro de Custo'}
        </Button>
      </form>
      <Table variant="simple" mt={8}>
        <Thead>
          <Tr>
            <Th>Código</Th>
            <Th>Descrição</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {centrosDeCusto.map((centro, index) => (
            <Tr key={index}>
              <Td>{centro.codigo}</Td>
              <Td>{centro.descricao}</Td>
              <Td>
                <Button size="sm" onClick={() => handleEditCentroDeCusto(index)}>Editar</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CentroDeCustoForm;
