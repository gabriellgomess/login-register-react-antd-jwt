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

const FormConfiguracoes = () => {
  const [centrosDeCusto, setCentrosDeCusto] = useState([]);
  const [setores, setSetores] = useState([]);
  const [atendente, setAtendente] = useState([]);

  useEffect(() => {
    fetchCentrosDeCusto();
    fetchSetores();
    fetchAtendente();
  }, []);

  const fetchCentrosDeCusto = async () => {
    try {
      const response = await axios.get('https://chamados.nexustech.net.br/api_chamados/get_centros_de_custo.php');
      setCentrosDeCusto(response.data);
    } catch (error) {
      console.error('Erro ao buscar centros de custo', error);
    }
  };

  const fetchSetores = async () => {
    try {
      const response = await axios.get('https://chamados.nexustech.net.br/api_chamados/get_setores.php');
      setSetores(response.data);
    } catch (error) {
      console.error('Erro ao buscar setores', error);
    }
  };

  const fetchAtendente = async () => {
    try {
      const response = await axios.get('https://chamados.nexustech.net.br/api_chamados/get_atendentes.php');
      setAtendente(response.data);
    } catch (error) {
      console.error('Erro ao buscar atendentes', error);
    }
  }

  return (
    <Box p={4}>
      <Tabs variant="enclosed" width="100%">
        <TabList>
          <Tab>Centro de Custo</Tab>
          <Tab>Setor</Tab>
          <Tab>Atendente</Tab>
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
              atendente={atendente}
              fetchAtendente={fetchAtendente}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default FormConfiguracoes;
