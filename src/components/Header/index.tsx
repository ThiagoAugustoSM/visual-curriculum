import React from 'react';

import {
  Stack,
  Image,
  Heading,
  Text,
  Button,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaGithub } from 'react-icons/fa';

import Logo from '../../assets/img/peacock-logo.png';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const openGithub = () => {
    window.open('https://github.com/ThiagoAugustoSM/visual-curriculum/');
  };

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      flexWrap="wrap"
    >
      <Stack direction="row" align="center">
        <Image
          boxSize="100px"
          src={Logo}
          alt="Imagem de um pavão representando a logo do Visual Curriculum"
        />
        <Stack direction="column" textAlign="left">
          <Heading as="h2" fontSize={['3xl', '4xl']}>
            Visual Curriculum
          </Heading>
          <Text>Uma nova forma de visualizar a sua grade curricular!</Text>
        </Stack>
      </Stack>
      <Stack direction="row" flexWrap="wrap" align="center" spacing={[0, 0, 4]}>
        <Button
          marginY="2"
          colorScheme="blue"
          variant="outline"
          rightIcon={<Icon as={FaGithub} />}
          onClick={() => openGithub()}
        >
          Quero contribuir!
        </Button>
        <Button
          onClick={toggleColorMode}
          rightIcon={
            colorMode === 'light' ? <Icon as={FaMoon} /> : <Icon as={FaSun} />
          }
        >
          Colocar em modo {colorMode === 'light' ? 'escuro?' : 'claro?'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
