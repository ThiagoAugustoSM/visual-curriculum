import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading } from '@chakra-ui/react';

import cinLogo from '../../assets/img/Logotipo-CIn.svg';
import cfchLogo from '../../assets/img/cfch-logo.png';
import ccenLogo from '../../assets/img/ccen-logo.png';
import ccsaLogo from '../../assets/img/ccsa-logo.png';
import cacLogo from '../../assets/img/cac-logo.png';
import ctgLogo from '../../assets/img/ctg-logo.png';
import ccsLogo from '../../assets/img/ccs-logo.png';
import ccjLogo from '../../assets/img/ccj-logo.png';
import ccmLogo from '../../assets/img/ccm-logo.png';
import cbLogo from '../../assets/img/cb-logo.png';

import Header from '../../components/Header';

function Home(): React.ReactElement {
  return (
    <Box m="5">
      <Header />
      <Heading as="h2" size="lg" marginY="2">
        Escolha o curso
      </Heading>
      <Flex gap={1} wrap={'wrap'}>
        <Link
          to={`/UFPE/engenhariaDaComputacao`}
          style={{ width: '450px', height: '125px' }}
        >
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cinLogo} alt="Cin Logo" width="100px" height="100px" />
            UFPE - Engenharia da computação
          </Box>
        </Link>
        <Link
          to={`/UFPE/cienciaDaComputacao`}
          style={{ width: '450px', height: '125px' }}
        >
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cinLogo} alt="Cin Logo" width="100px" height="100px" />
            UFPE - Ciência da computação
          </Box>
        </Link>
        <Link
          to={`/UFPE/sistemasDeInformacao`}
          style={{ width: '450px', height: '125px' }}
        >
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cinLogo} alt="Cin Logo" width="100px" height="100px" />
            UFPE - Sistemas de informação
          </Box>
        </Link>
        <Link to={`/UFPE/teatro`} style={{ width: '450px', height: '125px' }}>
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cacLogo} alt="CAC Logo" width="100px" height="100px" />
            UFPE - Teatro
          </Box>
        </Link>
        <Link
          to={`/UFPE/historiaB`}
          style={{ width: '450px', height: '125px' }}
        >
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cfchLogo} alt="CFCH Logo" width="100px" height="100px" />
            UFPE - História Bacharelado
          </Box>
        </Link>
        <Link
          to={`/UFPE/engenhariaCivil`}
          style={{ width: '450px', height: '125px' }}
        >
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={ctgLogo} alt="CTG Logo" width="100px" height="100px" />
            UFPE - Engenharia Civil
          </Box>
        </Link>
        <Link
          to={`/UFPE/cienciasBiologicasEA`}
          style={{ width: '450px', height: '125px' }}
        >
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cbLogo} alt="CB Logo" width="100px" height="100px" />
            UFPE - Ciências Biológicas com ênfase em Ciências Ambientais
          </Box>
        </Link>
        <Link
          to={`/UFPE/matematicaB`}
          style={{ width: '450px', height: '125px' }}
        >
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={ccenLogo} alt="CCEN Logo" width="100px" height="100px" />
            UFPE - Matemática Bacharelado
          </Box>
        </Link>
        <Link
          to={`/UFPE/enfermagem`}
          style={{ width: '450px', height: '125px' }}
        >
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={ccsLogo} alt="CCS Logo" width="100px" height="100px" />
            UFPE - Enfermagem
          </Box>
        </Link>
        <Link
          to={`/UFPE/administracao`}
          style={{ width: '450px', height: '125px' }}
        >
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={ccsaLogo} alt="CCSA Logo" width="100px" height="100px" />
            UFPE - Administração
          </Box>
        </Link>
        <Link to={`/UFPE/direito`} style={{ width: '450px', height: '125px' }}>
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={ccjLogo} alt="CCJ Logo" width="100px" height="100px" />
            UFPE - Direito
          </Box>
        </Link>
        <Link to={`/UFPE/medicina`} style={{ width: '450px', height: '125px' }}>
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            h={'100%'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={ccmLogo} alt="CCM Logo" width="100px" height="100px" />
            UFPE - Medicina
          </Box>
        </Link>
      </Flex>
    </Box>
  );
}
export default Home;
