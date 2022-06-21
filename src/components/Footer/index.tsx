import React from 'react';
import { Box, Stack, Text, Icon, IconButton } from '@chakra-ui/react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { DiGitMerge } from 'react-icons/di';
import abagatinhoIcon from '../../assets/img/abagatinho.svg';

const Footer = (): React.ReactElement => {
  return (
    <Stack align="center" mt="1">
      <Text>
        Feito com{' '}
        <span role="img" aria-label="hearth">
          💙
        </span>{' '}
        em Recife, por Thiago Augusto <Icon color="green" as={DiGitMerge} />{' '}
        Abagatinho
      </Text>
      <Stack spacing={3} direction="row">
        <a href="https://www.linkedin.com/in/thiagoaugustosm/">
          <IconButton
            size="sm"
            aria-label="Abrir Linkedin"
            icon={<Icon as={FaLinkedinIn} />}
          />
        </a>
        <a href="https://github.com/ThiagoAugustoSM">
          <IconButton
            size="sm"
            aria-label="Abrir Linkedin"
            icon={<Icon as={FaGithub} />}
          />
        </a>

        <Box
          bg="var(--chakra-colors-gray-100)"
          padding="0px"
          lineHeight="1.2"
          justifyContent="center"
          borderRadius="var(--chakra-radii-md)"
          display="inline-flex"
          outlineOffset="2px"
          whiteSpace="nowrap"
          position="relative"
          width="var(--chakra-sizes-8)"
          font-size="var(--chakra-fontSizes-sm)"
          padding-inline-start="var(--chakra-space-3)"
          cursor="pointer"
        >
          <a href={'https://github.com/Abagatinho'}>
            <img src={abagatinhoIcon} alt="Abrir organização" />
          </a>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Footer;
