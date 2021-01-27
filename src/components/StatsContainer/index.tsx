import React from 'react';

import { Stack, Heading, Box } from '@chakra-ui/react';

import StatsHours from '../StatsHours';

const StatsContainer = (props) => {
  const {
    academicTotalDone,
    academicObligatoryDone,
    academicElectiveDone,
    totalHours,
    totalHoursObligatory,
    totalHoursElective,
  } = props;
  return (
    <Stack>
      <Heading as="h2" size="lg" marginY="2">
        Aproveitamento Acadêmico
      </Heading>
      <Box w="100%" d="flex" flexWrap="wrap">
        <StatsHours
          title="Total"
          partial={academicTotalDone}
          total={totalHours}
        />
        <StatsHours
          title="Obrigatória"
          partial={academicObligatoryDone}
          total={totalHoursObligatory}
        />
        <StatsHours
          title="Eletivas"
          partial={academicElectiveDone}
          total={totalHoursElective}
        />
      </Box>
    </Stack>
  );
};

export default StatsContainer;
