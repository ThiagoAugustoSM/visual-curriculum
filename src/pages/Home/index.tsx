import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading } from '@chakra-ui/react';

import cinLogo from '../../assets/img/Logotipo-CIn.svg';
import cfchLogo from '../../assets/img/cfch-logo.png';
import cacLogo from '../../assets/img/cac-logo.png';

import Header from '../../components/Header';

function Home(): React.ReactElement {
  return (
    <Box m="5">
      <Header />
      <Heading as="h2" size="lg" marginY="2">
        Escolha o curso
      </Heading>
      <Flex gap={1}>
        <Link to={`/UFPE/engenhariaDaComputacao`} style={{ width: '450px' }}>
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cinLogo} alt="Cin Logo" width="100px" height="100px" />
            UFPE - Engenharia da computação
          </Box>
        </Link>
        <Link to={`/UFPE/cienciaDaComputacao`} style={{ width: '450px' }}>
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cinLogo} alt="Cin Logo" width="100px" height="100px" />
            UFPE - Ciência da computação
          </Box>
        </Link>
        <Link to={`/UFPE/sistemasDeInformacao`} style={{ width: '450px' }}>
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cinLogo} alt="Cin Logo" width="100px" height="100px" />
            UFPE - Sistemas de informação
          </Box>
        </Link>
        <Link to={`/UFPE/historiaB`} style={{ width: '450px' }}>
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cfchLogo} alt="CFCH Logo" width="100px" height="100px" />
            UFPE - História Bacharelado
          </Box>
        </Link>
        <Link to={`/UFPE/teatro`} style={{ width: '450px' }}>
          <Box
            display="flex"
            p="3"
            fontSize="lg"
            maxW="md"
            minW="100px"
            minH="100px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            alignItems="center"
          >
            <img src={cacLogo} alt="CAC Logo" width="100px" height="100px" />
            UFPE - Teatro
          </Box>
        </Link>
      </Flex>
    </Box>
  );
}
export default Home;
