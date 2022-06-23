import React, { useEffect, useState } from 'react';
import {
  useColorMode,
  Box,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  UnorderedList,
  ListItem,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { AiOutlineLock } from 'react-icons/ai';
import { DisciplineBoxProps } from '../../models/Curriculum';

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

const DisciplineBox = (props: DisciplineBoxProps): React.ReactElement => {
  const {
    onClick,
    id,
    name,
    hours,
    ementa,
    credits,
    isActive,
    semester,
    isObligatory,
    prerequisites,
  } = props;
  const [bgColor, setBgColor] = useState('white');
  const [bgColorDark, setBgColorDark] = useState('');
  const [popover, setPopover] = useState({ bgColor: '', color: '' });

  const { colorMode } = useColorMode();

  const handleClick = () => {
    onClick({
      isActive: !isActive,
      isObligatory,
      hours,
      id,
    });
  };

  useEffect(() => {
    if (isActive !== true) {
      setBgColor('white');
      setBgColorDark('gray.800');
    } else {
      setBgColor('green.200');
      setBgColorDark('green.500');
    }
    setPopover({
      bgColor: colorMode === 'light' ? 'white' : 'gray.800',
      color: colorMode === 'light' ? 'gray.500' : 'gray.400',
    });
  }, [colorMode, isActive]);

  return (
    <Box
      id={id}
      as="button"
      bgColor={colorMode === 'light' ? bgColor : bgColorDark}
      borderRadius="lg"
      borderWidth="1px"
      m="3"
      overflow="hidden"
      width="300px"
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      justifyContent={'space-between'}
    >
      <Box p="4" onClick={handleClick}>
        <Flex alignItems="center">
          <Badge
            borderRadius="full"
            colorScheme={badgeSemesterColor(semester)}
            px="2"
          >
            {semester}º Período
          </Badge>

          <Box
            color="gray.500"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            marginX="2"
            textTransform="uppercase"
          >
            {isObligatory ? 'Obrigatória' : 'Eletiva'}
          </Box>

          {prerequisites.length > 0 && (
            <Box ml="auto">
              <Popover placement="top" trigger="hover">
                <PopoverTrigger>
                  <Box>
                    <AiOutlineLock />
                  </Box>
                </PopoverTrigger>
                <Flex>
                  <PopoverContent
                    bgColor={popover.bgColor}
                    color={popover.color}
                    fontSize="12px"
                    marginX="auto"
                    maxW="200px"
                    textTransform="uppercase"
                  >
                    <PopoverArrow bgColor={popover.bgColor} />
                    <PopoverHeader fontWeight="semibold">
                      Pré-requisitos
                    </PopoverHeader>
                    <PopoverBody>
                      <UnorderedList>
                        {prerequisites.map((prerequisite) => (
                          <ListItem key={prerequisite.code}>
                            {prerequisite.name}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </PopoverBody>
                  </PopoverContent>
                </Flex>
              </Popover>
            </Box>
          )}
        </Flex>

        <Box mt="1" as="h4" fontWeight="semibold" whiteSpace="pre-wrap">
          {id} - {name}
        </Box>

        <Flex gap={2} justifyContent={'center'}>
          <Box>
            {hours}
            <Box as="span" color="gray.600" fontSize="sm">
              HRs
            </Box>
          </Box>
          <Box>
            {credits}
            <Box as="span" color="gray.600" fontSize="sm" ml="1">
              crédito(s)
            </Box>
          </Box>
        </Flex>
      </Box>
      <Accordion
        allowToggle
        width="100%"
        bg="var(--chakra-colors-chakra-body-bg)"
        boxShadow="0px -2px 5px #eee"
      >
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton>
                {isExpanded ? (
                  <Box margin="auto">Esconder Ementa</Box>
                ) : (
                  <Box margin="auto">Mostrar Ementa</Box>
                )}
              </AccordionButton>
              <AccordionPanel>{ementa}</AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default DisciplineBox;
