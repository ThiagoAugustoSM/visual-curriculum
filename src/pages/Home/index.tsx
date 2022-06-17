import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Stack, Heading } from '@chakra-ui/react';

import Header from '../../components/Header';

function Home(): React.ReactElement {
  return (
    <Box m="5">
      <Header />
      <Heading as="h2" size="lg" marginY="2">
        Escolha o curso
      </Heading>
      <Stack>
        <Link to={`/UFPE/engenhariaDaComputacao`}>
          <Box
            m="3"
            maxW="md"
            minW="200px"
            minH="200px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Text> UFPE - Engenharia da computação </Text>
          </Box>
        </Link>
        <Link to={`/UFPE/cienciaDaComputacao`}>
          <Box
            m="3"
            maxW="md"
            minW="200px"
            minH="200px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Text> UFPE - Ciência da computação </Text>
          </Box>
        </Link>
        <Link to={`/UFPE/sistemasDeInformacao`}>
          <Box
            m="3"
            maxW="md"
            minW="200px"
            minH="200px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Text> UFPE - Sistemas de informação </Text>
          </Box>
        </Link>
      </Stack>
    </Box>
  );
}
export default Home;
