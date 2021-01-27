import React, { useState } from 'react';

import { Box, Badge, useColorMode } from '@chakra-ui/react';
import { DisciplineType } from '../../models/Curriculum';

const badgeSemesterColor = (semester: number) => {
  switch (semester) {
    case 1:
      return 'gray';
    case 2:
      return 'red';
    case 3:
      return 'orange';
    case 4:
      return 'yellow';
    case 5:
      return 'green';
    case 6:
      return 'teal';
    case 7:
      return 'blue';
    case 8:
      return 'cyan';
    case 9:
      return 'purple';
    case 10:
      return 'pink';
    default:
      return 'gray';
  }
};

type OnClickTypes = {
  isActive: boolean;
  id: string;
  isObligatory: boolean;
  hours: number;
};

type DisciplineBoxProps = {
  id: string;
  onClick: (params: OnClickTypes) => void;
} & DisciplineType;

const DisciplineBox = (props: DisciplineBoxProps): React.ReactElement => {
  const { semester, isObligatory, name, hours, credits, id, onClick } = props;
  const [isActive, setIsActive] = useState(false);
  const { colorMode } = useColorMode();
  const [bgColor, setBgColor] = useState('white');
  const [bgColorDark, setBgColorDark] = useState('');

  const handleClick = () => {
    if (isActive === true) {
      setBgColor('white');
      setBgColorDark('gray.800');
    } else {
      setBgColor('green.200');
      setBgColorDark('green.500');
    }
    onClick({ isActive: !isActive, id, isObligatory, hours });
    setIsActive(!isActive);
  };

  return (
    <Box
      id={id}
      onClick={handleClick}
      m="3"
      minW="200px"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bgColor={colorMode === 'light' ? bgColor : bgColorDark}
    >
      <Box p="4">
        <Box d="flex" alignItems="baseline">
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={badgeSemesterColor(semester)}
          >
            {semester} º Período
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {isObligatory ? 'Obrigatória' : 'Eletiva'}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>

        <Box>
          {hours}
          <Box as="span" color="gray.600" fontSize="sm">
            HRs
          </Box>
        </Box>

        <Box>
          {credits}
          <Box as="span" ml="1" color="gray.600" fontSize="sm">
            crédito(s)
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DisciplineBox;
