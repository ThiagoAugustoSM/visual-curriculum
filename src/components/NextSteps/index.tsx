import React from 'react';

import {
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { MdTimelapse } from 'react-icons/md';

const NextSteps = (): React.ReactElement => {
  return (
    <Stack>
      <Heading as="h2" size="md" marginY="1">
        Sobre o Projeto
      </Heading>
      <Text>
        Este projeto tem o objetivo de facilitar o entendimento do currículo de
        universidades do Brasil, através de uma fácil visualização. Com o modelo
        Open Source, estudantes de todo o Brasil podem adicionar informações
        atualizadas a este site. O projeto ainda está em desenvolvimento, abaixo
        estão as próximas funcionalidades:
      </Text>
      <List spacing={1}>
        <ListItem>
          <ListIcon as={MdTimelapse} color="green.500" />
          Capturar e utilizar co-requisitos e equivalências
        </ListItem>
        <ListItem>
          <ListIcon as={MdTimelapse} color="green.500" />
          Habilitar para a criação de novos currículos e Universidades.
        </ListItem>
      </List>
    </Stack>
  );
};

export default NextSteps;
