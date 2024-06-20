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

const SetorForm = ({ centrosDeCusto, setores, fetchSetores }) => {
  const [codigoSetor, setCodigoSetor] = useState('');
  const [descricaoSetor, setDescricaoSetor] = useState('');
  const [centroDeCustoId, setCentroDeCustoId] = useState('');
  const [editIndexSetor, setEditIndexSetor] = useState(null);
  const toast = useToast();

  const handleSubmitSetor = async (e) => {
    e.preventDefault();

    const setor = { codigo: codigoSetor, descricao: descricaoSetor, centro_de_custo_id: centroDeCustoId };

    try {
      if (editIndexSetor !== null) {
        await axios.put(`https://chamados.nexustech.net.br/api_chamados/update_setor.php?id=${setores[editIndexSetor].id}`, setor);
        toast({
          title: 'Setor atualizado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        const response = await axios.post('https://chamados.nexustech.net.br/api_chamados/post_setor.php', setor);
        fetchSetores();
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
    setDescricaoSetor('');
    setCentroDeCustoId('');
    setEditIndexSetor(null);
  };

  const handleEditSetor = (index) => {
    setEditIndexSetor(index);
    setCodigoSetor(setores[index].codigo);
    setDescricaoSetor(setores[index].descricao);
    setCentroDeCustoId(setores[index].centro_de_custo_id);
  };

  return (
    <Box>
      <form onSubmit={handleSubmitSetor}>
        <FormControl id="codigoSetor" isRequired>
          <FormLabel>Código do Setor</FormLabel>
          <Input
            value={codigoSetor}
            onChange={(e) => setCodigoSetor(e.target.value)}
            placeholder="Código do Setor"
          />
        </FormControl>

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
                {centro.descricao}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="teal" mt={4}>
          {editIndexSetor !== null ? 'Editar Setor' : 'Adicionar Setor'}
        </Button>
      </form>
      <Table variant="simple" mt={8}>
        <Thead>
          <Tr>
            <Th>Código</Th>
            <Th>Descrição</Th>
            <Th>Centro de Custo</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {setores.map((setor, index) => (
            <Tr key={index}>
              <Td>{setor.codigo}</Td>
              <Td>{setor.descricao}</Td>
              <Td>{centrosDeCusto.find(centro => centro.id === setor.centro_de_custo_id)?.descricao || ''}</Td>
              <Td>
                <Button size="sm" onClick={() => handleEditSetor(index)}>Editar</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SetorForm;
