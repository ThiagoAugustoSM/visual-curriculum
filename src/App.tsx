import React, { useEffect } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import Header from './components/Header';
import Navigator from './components/Navigator';
import DisciplineBox from './components/DisciplineBox';
import StatsContainer from './components/StatsContainer';
import NextSteps from './components/NextSteps';
import Footer from './components/Footer';

import useCurriculum from './service/hook';

type ParamsType = {
  course: string;
  university: string;
};

function App(): React.ReactElement {
  const { loadCurriculum, curriculum, updateState, completed } =
    useCurriculum();
  const params = useParams<ParamsType>();

  useEffect(() => {
    loadCurriculum(params.university, params.course);
  }, [loadCurriculum, params]);

  const arrayOfSemesters = Array.from(
    { length: curriculum?.semesters },
    (_, i) => i + 1
  );

  return (
    <Box m="5">
      <Header />
      <Navigator
        university={curriculum.university}
        course={curriculum.course}
      />
      <Box w="100%" maxH="60vh" overflow="scroll">
        {arrayOfSemesters.map((semester) => (
          <Box d="flex" w="100%" key={`row-${semester}`}>
            {curriculum?.disciplines
              .filter((item) => item.semester === semester)
              .map((item) => (
                <DisciplineBox
                  key={item.name}
                  id={item.code}
                  onClick={updateState}
                  {...item}
                />
              ))}
          </Box>
        ))}
      </Box>
      <SimpleGrid columns={[1, 2]} spacing="5">
        <StatsContainer
          academicTotal={completed.academicTotal}
          academicObligatory={completed.academicObligatory}
          academicElective={completed.academicElective}
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
