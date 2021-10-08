import React from 'react';
import { Stack, Heading, Box } from '@chakra-ui/react';

import StatsHours from '../StatsHours';

type StatsContainerProps = {
  academicTotal: number;
  academicObligatory: number;
  academicElective: number;
  totalHours: number;
  totalHoursObligatory: number;
  totalHoursElective: number;
};

const StatsContainer = ({
  academicTotal,
  academicObligatory,
  academicElective,
  totalHours,
  totalHoursObligatory,
  totalHoursElective,
}: StatsContainerProps): React.ReactElement => {
  return (
    <Stack>
      <Heading as="h2" size="lg" marginY="2">
        Aproveitamento Acadêmico
      </Heading>
      <Box w="100%" d="flex" flexWrap="wrap">
        <StatsHours
          title="Total"
          partial={academicTotal}
          total={totalHours}
        />
        <StatsHours
          title="Obrigatória"
          partial={academicObligatory}
          total={totalHoursObligatory}
        />
        <StatsHours
          title="Eletivas"
          partial={academicElective}
          total={totalHoursElective}
        />
      </Box>
    </Stack>
  );
};

export default StatsContainer;
