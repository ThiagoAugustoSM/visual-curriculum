import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Grid } from '@chakra-ui/react';
import Header from '../../components/Header';
import Navigator from '../../components/Navigator';
import DisciplineBox from '../../components/DisciplineBox';
import StatsContainer from '../../components/StatsContainer';
import NextSteps from '../../components/NextSteps';
import Footer from '../../components/Footer';
import localForage from 'localforage';
import setAcademicHours from '../../utils/setAcademicHours';
import {
  CurriculumType,
  DisciplineType,
  Itime,
  OnClickTypes,
} from '../../models/Curriculum';

import requestDisciplines from '../../utils/requestDisciplines';
import { useParams } from 'react-router-dom';

localForage.config({
  name: 'cv',
  description: 'save changes',
  storeName: 'disciplines',
});

export default function CurriculumPage(): React.ReactElement {
  const [curriculum, setCurriculum] = useState<
    CurriculumType | Record<string, never>
  >({});
  const [academicTotalDone, setAcademicTotalDone] = useState(0);
  const [academicObligatoryDone, setAcademicObligatoryDone] = useState(0);
  const [academicElectiveDone, setAcademicElectiveDone] = useState(0);
  const params = useParams();

  const setters = {
    setAcademicObligatoryDone,
    setAcademicElectiveDone,
    setAcademicTotalDone,
  };

  const handleClick = (props: OnClickTypes): boolean => {
    const { isActive, isObligatory, hours, id, setDisabled } = props;
    const newData = curriculum;
    const discipline = newData.disciplines.find((el) => el.code === id);
    if (discipline) {
      if (discipline.prerequisites.length) {
        const requisiteSize = discipline.prerequisites.length;
        let length = 0;
        discipline.prerequisites.forEach((disciplineID) => {
          const element = newData.disciplines.find(
            (el) => disciplineID.code === el.code
          );
          if (element?.isActive) length++;
        });
        if (length === requisiteSize) {
          setAcademicHours(setters, isActive, isObligatory, hours);
          setDisabled(false);
          discipline.isActive = isActive;
          setCurriculum(newData);
          return false;
        } else {
          setDisabled(true);
          return true;
        }
      } else {
        setAcademicHours(setters, isActive, isObligatory, hours);
        discipline.isActive = isActive;
        setCurriculum(newData);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    async function loadData() {
      const data: CurriculumType = await requestDisciplines(
        params.university as string,
        params.course as string
      );

      const tempo: Itime | null = await localForage.getItem('hours');
      if (tempo !== null) {
        setAcademicTotalDone(tempo.total);
        setAcademicElectiveDone(tempo.eletiva);
        setAcademicObligatoryDone(tempo.obrigatoria);
      }
      const disciplines: [DisciplineType] | null = await localForage.getItem(
        'disciplines'
      );

      if (disciplines !== null) {
        disciplines.map((el) => {
          el.isActive = el.isActive ?? false;
          return el;
        });
        data.disciplines = disciplines;
      }
      setCurriculum(data);
    }
    loadData();
  }, [params.university, params.course]);

  useEffect(() => {
    if (!academicTotalDone) return;
    localForage.setItem('hours', {
      total: academicTotalDone,
      eletiva: academicElectiveDone,
      obrigatoria: academicObligatoryDone,
    });
    localForage.setItem('disciplines', curriculum.disciplines);
  }, [
    academicObligatoryDone,
    academicElectiveDone,
    academicTotalDone,
    curriculum.disciplines,
  ]);

  const arrayOfSemesters = Array.from(
    { length: curriculum?.semesters },
    (_, i) => i + 1
  );
  return (
    <Box m="5">
      <Header />
      <Navigator />
      <Box w="100%" maxWidth="1700px" maxH="60vh" overflow="scroll">
        {arrayOfSemesters.map((semester) => (
          <Grid
            maxW="1600px"
            key={`rows-${semester}`}
            templateColumns="repeat(5, 1fr)"
            gap={1}
          >
            {curriculum?.disciplines
              .filter((item) => item.semester === semester)
              .filter((item) => item.isObligatory)
              .map((item) => (
                <DisciplineBox
                  key={item.name}
                  id={item.code}
                  onClick={handleClick}
                  {...item}
                />
              ))}
          </Grid>
        ))}
        <hr style={{ maxWidth: 'calc(100% - 10px)' }} />
        {arrayOfSemesters.map((semester) => (
          <Grid
            maxW="1600px"
            key={`rows-${semester}`}
            templateColumns="repeat(5, 1fr)"
            gap={1}
          >
            {curriculum?.disciplines
              .filter((item) => item.semester === semester)
              .filter((item) => !item.isObligatory)
              .map((item) => (
                <DisciplineBox
                  key={item.name}
                  id={item.code}
                  onClick={handleClick}
                  {...item}
                />
              ))}
          </Grid>
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
