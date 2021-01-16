import React from 'react';

import {
  Stack,
  Text,
  Icon,
  IconButton
} from '@chakra-ui/react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Stack
      align="center"
      mt="5"
    >
      <Text>
        Feito com 💙 em Recife, por Thiago Augusto
      </Text>
      <Stack spacing={3} direction="row">
        <IconButton 
          size="sm"
          aria-label="Abrir Linkedin"
          icon={<Icon as={FaLinkedinIn}/>}
        />
        <IconButton 
          size="sm"
          aria-label="Abrir Linkedin"
          icon={<Icon as={FaGithub}/>}
        />
      </Stack>
    </Stack>
  )
}

export default Footer;