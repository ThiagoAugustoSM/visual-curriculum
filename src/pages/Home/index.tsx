import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Heading } from '@chakra-ui/react';
import logoIcon from '../../assets/img/Logotipo-CIn.svg';

import Header from '../../components/Header';

function Home(): React.ReactElement {
  return (
    <Box m="5">
      <Header />
      <Heading as="h2" size="lg" marginY="2">
        Escolha o curso
      </Heading>
      <Stack gap={1}>
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
            <img src={logoIcon} alt="Cin Logo" width="100px" height="100px" />
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
            <img src={logoIcon} alt="Cin Logo" width="100px" height="100px" />
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
            <img src={logoIcon} alt="Cin Logo" width="100px" height="100px" />
            UFPE - Sistemas de informação
          </Box>
        </Link>
      </Stack>
    </Box>
  );
}
export default Home;
