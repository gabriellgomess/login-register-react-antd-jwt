import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import CentroDeCustoForm from './CentroDeCustoForm';
import SetorForm from './SetorForm';
import AtendenteForm from './AtendenteForm';
import FormUsuarios from './FormUsuarios';

const FormConfiguracoes = () => {
  const [centrosDeCusto, setCentrosDeCusto] = useState([]);
  const [setores, setSetores] = useState([]);
  const [atendentes, setAtendentes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchCentrosDeCusto();
    fetchSetores();
    fetchAtendentes();
    fetchUsuarios();
  }, []);

  const fetchCentrosDeCusto = async () => {
    try {
      const response = await axios.get('https://chamados.nexustech.net.br/api_chamados/centros_de_custo/read.php');
      setCentrosDeCusto(response.data);
    } catch (error) {
      console.error('Erro ao buscar centros de custo', error);
    }
  };

  const fetchSetores = async () => {
    try {
      const response = await axios.get('https://chamados.nexustech.net.br/api_chamados/setores/read.php');
      setSetores(response.data);
    } catch (error) {
      console.error('Erro ao buscar setores', error);
    }
  };

  const fetchAtendentes = async () => {
    try {
      const response = await axios.get('https://chamados.nexustech.net.br/api_chamados/atendentes/read.php');
      setAtendentes(response.data);
      console.log("Atendentes: ", response.data);
    } catch (error) {
      console.error('Erro ao buscar atendentes', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('https://chamados.nexustech.net.br/api_chamados/usuarios/read.php');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };

  return (
    <Box p={4}>
      <Tabs variant="enclosed" width="100%">
        <TabList>
          <Tab>Centro de Custo</Tab>
          <Tab>Setor</Tab>
          <Tab>Atendente</Tab>
          <Tab>Usuários</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CentroDeCustoForm
              centrosDeCusto={centrosDeCusto}
              fetchCentrosDeCusto={fetchCentrosDeCusto}
            />
          </TabPanel>
          <TabPanel>
            <SetorForm
              centrosDeCusto={centrosDeCusto}
              setores={setores}
              fetchSetores={fetchSetores}
            />
          </TabPanel>
          <TabPanel>
            <AtendenteForm
              centrosDeCusto={centrosDeCusto}
              setores={setores}
              usuarios={usuarios}
              atendentes={atendentes}
              fetchAtendentes={fetchAtendentes}
            />
          </TabPanel>
          <TabPanel>
            <FormUsuarios
              usuarios={usuarios}
              fetchUsuarios={fetchUsuarios}
            />
          </TabPanel>
         
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default FormConfiguracoes;
