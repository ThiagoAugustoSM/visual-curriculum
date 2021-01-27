import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';

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

  const handleClick = ({ isActive, isObligatory, hours }) => {
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
    fetch('./university/UFPE/engenhariaDaComputacao.json')
      .then((response) => response.json())
      .then((json) => setCurriculum(json));
  }, []);

  const arrayOfSemesters = Array.from(
    { length: curriculum?.semesters },
    (_, i) => i + 1
  );

  return (
    <Box m="5">
      <Header />
      <Navigator />
      <Box w="100%" maxH="60vh" overflow="scroll">
        {arrayOfSemesters.map((semester) => (
          <Box d="flex" w="100%" key={`row-${semester}`}>
            {curriculum?.disciplines
              .filter((item) => item.semester === semester)
              .map((item) => (
                <DisciplineBox
                  key={item.name}
                  id={item.code}
                  onClick={handleClick}
                  {...item}
                />
              ))}
          </Box>
        ))}
      </Box>
      <SimpleGrid columns={[1, 2]} spacing="5">
        <StatsContainer
          academicTotalDone={academicTotalDone}
          academicObligatoryDone={academicObligatoryDone}
          academicElectiveDone={academicElectiveDone}
          totalHours={curriculum?.totalHours}
          totalHoursObligatory={curriculum?.totalHoursObligatory}
          totalHoursElective={curriculum?.totalHoursElective}
        />
        <NextSteps />
      </SimpleGrid>
      <Footer />
    </Box>
  );
}

export default App;
