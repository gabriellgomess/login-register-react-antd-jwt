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
    VStack,
    HStack,
    Text,
    Flex,
} from '@chakra-ui/react';

const FormUsuarios = ({ usuarios, fetchUsuarios }) => {

    const [nomeUsuario, setNomeUsuario] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');
    const [telefoneUsuario, setTelefoneUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [editIndexUsuario, setEditIndexUsuario] = useState(null);
    const toast = useToast();


    const handleSubmitUsuario = async (e) => {
        e.preventDefault();

        const novoUsuario = { nome: nomeUsuario, email: emailUsuario, senha: senhaUsuario };

        try {
            if (editIndexUsuario !== null) {
                await axios.put(`https://chamados.nexustech.net.br/api_chamados/usuarios/update.php`, {
                    id: usuarios[editIndexUsuario].id,
                    ...novoUsuario
                });
                toast({
                    title: 'Usuário atualizado.',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                await axios.post('https://chamados.nexustech.net.br/api_chamados/usuarios/create.php', novoUsuario);
                toast({
                    title: 'Usuário adicionado.',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            }
            fetchUsuarios();
        } catch (error) {
            console.error('Erro ao salvar usuário', error);
        }

        setNomeUsuario('');
        setEmailUsuario('');
        setSenhaUsuario('');
        setEditIndexUsuario(null);
    };

    const handleEditUsuario = (index) => {
        setEditIndexUsuario(index);
        setNomeUsuario(usuarios[index].nome);
        setEmailUsuario(usuarios[index].email);
        setSenhaUsuario('');
    };

    const handleDeleteUsuario = async (id) => {
        try {
            await axios.delete(`https://chamados.nexustech.net.br/api_chamados/usuarios/delete.php?id=${id}`);
            toast({
                title: 'Usuário excluído.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            fetchUsuarios();
        } catch (error) {
            console.error('Erro ao excluir usuário', error);
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmitUsuario}>
                <FormControl id="nomeUsuario" isRequired>
                    <FormLabel>Nome do Usuário</FormLabel>
                    <Input
                        value={nomeUsuario}
                        onChange={(e) => setNomeUsuario(e.target.value)}
                        placeholder="Nome do Usuário"
                    />
                </FormControl>
                <Flex mt={4} justifyContent="space-between" gap="20px" flexDirection="column">
                    <FormControl id="emailUsuario" isRequired>
                        <FormLabel>Email do Usuário</FormLabel>
                        <Input
                            value={emailUsuario}
                            onChange={(e) => setEmailUsuario(e.target.value)}
                            placeholder="Email do Usuário"
                        />
                    </FormControl>

                    <FormControl id="telefoneUsuario" isRequired>
                        <FormLabel>Telefone do Usuário</FormLabel>
                        <Input
                            value={telefoneUsuario}
                            onChange={(e) => setTelefoneUsuario(e.target.value)}
                            placeholder="Telefone do Usuário"
                        />
                    </FormControl>

                    <FormControl id="senhaUsuario" isRequired>
                        <FormLabel>Senha do Usuário</FormLabel>
                        <Input
                            type="password"
                            value={senhaUsuario}
                            onChange={(e) => setSenhaUsuario(e.target.value)}
                            placeholder="Senha do Usuário"
                        />
                    </FormControl>
                </Flex>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <Button type="submit" colorScheme="teal" mt={4}>
                        {editIndexUsuario !== null ? 'Editar Usuário' : 'Adicionar Usuário'}
                    </Button>
                    {editIndexUsuario !== null && (
                        <Button
                            type="button"
                            colorScheme="red"
                            variant='outline'
                            mt={4}
                            onClick={() => {
                                setEditIndexUsuario(null);
                                setNomeUsuario('');
                                setEmailUsuario('');
                                setSenhaUsuario('');
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
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {usuarios.map((usuario, index) => (
                        <Tr key={usuario.id}>
                            <Td>{usuario.nome}</Td>
                            <Td>{usuario.email}</Td>
                            <Td>
                                <Button size="sm" onClick={() => handleEditUsuario(index)}>Editar</Button>
                                <Button size="sm" colorScheme="red" onClick={() => handleDeleteUsuario(usuario.id)} ml={2} variant='outline'>Excluir</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default FormUsuarios;
