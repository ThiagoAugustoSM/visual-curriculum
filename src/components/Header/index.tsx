import React from 'react';
import { Link } from 'react-router-dom';

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

const Header = (): React.ReactElement => {
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
      <Link to="/">
        <Stack direction="row" align="center">
          <Image
            boxSize="100px"
            src={process.env.PUBLIC_URL + '/assets/img/peacock-logo.png'}
            alt="Imagem de um pavão representando a logo do Visual Curriculum"
          />
          <Stack direction="column" textAlign="left">
            <Heading as="h2" fontSize={['3xl', '4xl']}>
              Visual Curriculum
            </Heading>
            <Text>Uma nova forma de visualizar a sua grade curricular!</Text>
          </Stack>
        </Stack>
      </Link>
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
