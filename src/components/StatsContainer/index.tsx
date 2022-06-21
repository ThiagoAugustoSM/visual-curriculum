import React from 'react';
import { Stack, Heading, Flex } from '@chakra-ui/react';

import StatsHours from '../StatsHours';

type StatsContainerProps = {
  academicTotalDone: number;
  academicObligatoryDone: number;
  academicElectiveDone: number;
  totalHours: number;
  totalHoursObligatory: number;
  totalHoursElective: number;
};

const StatsContainer = ({
  academicTotalDone,
  academicObligatoryDone,
  academicElectiveDone,
  totalHours,
  totalHoursObligatory,
  totalHoursElective,
}: StatsContainerProps): React.ReactElement => {
  return (
    <Stack>
      <Heading as="h3" size="lg" marginY="1">
        Aproveitamento Acadêmico
      </Heading>
      <Flex flexWrap="wrap" w="100%">
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
      </Flex>
    </Stack>
  );
};

export default StatsContainer;
