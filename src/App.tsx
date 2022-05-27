import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Flex } from '@chakra-ui/react';
import Header from './components/Header';
import Navigator from './components/Navigator';
import DisciplineBox from './components/DisciplineBox';
import StatsContainer from './components/StatsContainer';
import NextSteps from './components/NextSteps';
import Footer from './components/Footer';
import localForage from 'localforage';
import { CurriculumType, DisciplineType, Itime } from './models/Curriculum';

localForage.config({
  name: 'cv',
  description: 'save changes',
  storeName: 'disciplines',
});

function App(): React.ReactElement {
  const [curriculum, setCurriculum] = useState<
    CurriculumType | Record<string, never>
  >({});
  const [academicTotalDone, setAcademicTotalDone] = useState(0);
  const [academicObligatoryDone, setAcademicObligatoryDone] = useState(0);
  const [academicElectiveDone, setAcademicElectiveDone] = useState(0);

  const handleClick = ({ isActive, isObligatory, hours, id }) => {
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
    const newData = curriculum;
    const discipline = newData.disciplines.find((el) => el.code === id);
    if (discipline) discipline.isActive = isActive;
    setCurriculum(newData);
    localForage.setItem('hours', {
      total: academicTotalDone,
      eletiva: academicElectiveDone,
      obrigatoria: academicObligatoryDone,
    });
    localForage.setItem('disciplines', curriculum.disciplines);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((json) => setCurriculum(json));
  }, []);

  useEffect(() => {
    async function loadData() {
      const tempo: Itime | null = await localForage.getItem('hours');
      if (tempo) {
        setAcademicTotalDone(tempo.total);
        setAcademicElectiveDone(tempo.eletiva);
        setAcademicObligatoryDone(tempo.obrigatoria);
      }
      const data = curriculum;
      const disciplines: [DisciplineType] | null = await localForage.getItem(
        'disciplines'
      );

      if (disciplines !== null) {
        disciplines.map((el) => {
          el.isActive = el.isActive ?? false;
        });
        data.disciplines = disciplines;
      }
      setCurriculum(data);
    }
    loadData();
  }, [curriculum]);

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
          <Flex key={`rows-${semester}`}>
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
