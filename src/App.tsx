import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Flex } from '@chakra-ui/react';
import Header from './components/Header';
import Navigator from './components/Navigator';
import DisciplineBox from './components/DisciplineBox';
import StatsContainer from './components/StatsContainer';
import NextSteps from './components/NextSteps';
import Footer from './components/Footer';
import { CurriculumType } from './models/Curriculum';

function App(): React.ReactElement {
  const [curriculum, setCurriculum] = useState<
    CurriculumType | Record<string, never>
  >({});
  const [academicTotalDone, setAcademicTotalDone] = useState(0);
  const [academicObligatoryDone, setAcademicObligatoryDone] = useState(0);
  const [academicElectiveDone, setAcademicElectiveDone] = useState(0);

  const handleClick = ({ isActive, isObligatory, hours, prerequisites }) => {
    //console.log(prerequisites);
    if (isActive) {
      if (isObligatory) {
        setAcademicObligatoryDone(academicObligatoryDone + hours);
      } else {
        setAcademicElectiveDone(academicElectiveDone + hours);
      }
      setAcademicTotalDone(academicTotalDone + hours);
    } else {
      if (isObligatory) {
        setAcademicObligatoryDone(academicObligatoryDone - hours);
      } else {
        setAcademicElectiveDone(academicElectiveDone - hours);
      }
      setAcademicTotalDone(academicTotalDone - hours);
    }
  };

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((json) => setCurriculum(json));
  }, []);

  const arrayOfSemesters = Array.from(
    { length: curriculum?.semesters },
    (_, i) => i + 1
  );
  //console.log(curriculum);
  return (
    <Box m="5">
      <Header />
      <Navigator />
      <Box
        w="100%"
        maxH="60vh"
        overflow="scroll"
        sx={{
          '&::-webkit-scrollbar-corner': {
            background: 'rgba(0, 0, 0, 0)',
          },
          '&::-webkit-scrollbar': {
            height: '0.5rem',
            width: '0.5rem',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '0.5rem',
            background: 'rgb(57, 62, 72)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgb(177, 183, 190)',
            borderRadius: '0.5rem',
          },
        }}
      >
        {arrayOfSemesters.map((semester) => (
          <Flex key={`rows-${semester}`}>
            {curriculum?.disciplines
              .filter((item) => item.semester === semester)
              .map((item) => (
                <DisciplineBox
                  key={item.name}
                  id={item.code}
                  //onClick={() => console.log(item)}
                  onClick={handleClick}
                  {...item}
                />
              ))}
          </Flex>
        ))}
      </Box>
      <SimpleGrid columns={[1, 2]} spacing="5">
        <StatsContainer
          academicTotalDone={academicTotalDone}
          academicObligatoryDone={academicObligatoryDone}
          academicElectiveDone={academicElectiveDone}
          totalHours={curriculum.totalHours}
          totalHoursObligatory={curriculum.totalHoursObligatory}
          totalHoursElective={curriculum.totalHoursElective}
        />
        <NextSteps />
      </SimpleGrid>
      <Footer />
    </Box>
  );
}

export default App;
