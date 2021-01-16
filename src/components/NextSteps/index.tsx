import React from 'react';

import {
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { MdTimelapse } from 'react-icons/md';

const NextSteps = () => {
  return (
    <Stack>
      <Heading as="h2" size="lg" marginY="2">
        Sobre o Projeto
      </Heading>
      <Text>
        Este projeto tem o objetivo de facilitar o entendimento do currículo de universidades do Brasil, através de uma fácil visualização. Com o modelo Open Source, estudantes de todo o Brasil podem adicionar informações atualizadas a este site. O projeto ainda está em desenvolvimento, abaixo estão as próximas funcionalidades:
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={MdTimelapse} color="green.500" />
          Opção de salvar o seu histórico localmente.
        </ListItem>
        <ListItem>
          <ListIcon as={MdTimelapse} color="green.500" />
          Habilitar para a criação de novos currículos e Universidades.
        </ListItem>
        <ListItem>
          <ListIcon as={MdTimelapse} color="green.500" />
          Visualização dos pré-requisitos de cada disciplina.
        </ListItem>
      </List>
    </Stack>
  )
}

export default NextSteps;