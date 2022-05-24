import React from 'react';
import { Box, Flex, Progress, Text } from '@chakra-ui/react';

type HourStatsProps = {
  title: string;
  total: number;
  partial: number;
};

const HourStats = ({
  title,
  total,
  partial,
}: HourStatsProps): React.ReactElement => {
  const percentage = parseFloat(((partial / total) * 100).toFixed(2));
  return (
    <Box
      minW="200px"
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      m="3"
    >
      <Flex>
        <Box
          p="4"
          flexDir="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Text as="h4" fontWeight="semibold" lineHeight="tight" noOfLines={1}>
            {title}
          </Text>
          <Box w="100%" mt="1">
            <Progress hasStripe size="md" value={percentage} />
          </Box>
          <Box>
            <Text>
              {percentage}
              <Box as="span" color="gray.600" fontSize="sm">
                %
              </Box>
            </Text>
          </Box>
          <Box flexDir="row">
            {partial}
            <Box as="span" color="gray.600" fontSize="sm">
              /
            </Box>
            {total}
            <Box as="span" color="gray.600" fontSize="sm">
              HRs
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default HourStats;
