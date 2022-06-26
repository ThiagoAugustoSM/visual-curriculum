import React from 'react';
import { Stack, Heading, Flex } from '@chakra-ui/react';

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
      <Heading as="h3" size="lg" marginY="1">
        Aproveitamento Acadêmico
      </Heading>
      <Flex flexWrap="wrap" w="100%">
        <StatsHours title="Total" partial={academicTotal} total={totalHours} />
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
      </Flex>
    </Stack>
  );
};

export default StatsContainer;
