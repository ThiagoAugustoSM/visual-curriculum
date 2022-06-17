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
  const [obligatory, setObligatory] = useState<Map<number, DisciplineType[]>>(
    new Map()
  );
  const [electives, setElectives] = useState<Map<number, DisciplineType[]>>(
    new Map()
  );
  const [activeDisciplines, setActiveDisciplines] = useState<Set<string>>(
    new Set()
  );
  const [disciplineMap, setDisciplineMap] = useState<
    Map<string, DisciplineType>
  >(new Map());

  const [academicObligatoryDone, setAcademicObligatoryDone] = useState(0);
  const [academicElectiveDone, setAcademicElectiveDone] = useState(0);
  const [academicTotalDone, setAcademicTotalDone] = useState(0);

  const params = useParams();

  const setters = {
    setAcademicObligatoryDone,
    setAcademicElectiveDone,
    setAcademicTotalDone,
  };

  const handleClick = (props: OnClickTypes) => {
    const { id, isActive, isObligatory, hours } = props;
    if (isActive) {
      let hasAllPreRequisites = true;
      disciplineMap.get(id)?.prerequisites.forEach((prerequisite) => {
        if (!activeDisciplines.has(prerequisite.code)) {
          hasAllPreRequisites = false;
        }
      });

      if (!hasAllPreRequisites) return;

      setAcademicHours(setters, isActive, isObligatory, hours);
      setActiveDisciplines((currentDisciplines) => {
        currentDisciplines.add(id);
        return currentDisciplines;
      });
    } else {
      setAcademicHours(setters, isActive, isObligatory, hours);
      setActiveDisciplines((currentDisciplines) => {
        currentDisciplines.delete(id);
        return currentDisciplines;
      });
    }
  };

  useEffect(() => {
    async function loadData() {
      const university = params.university as string;
      const course = params.course as string;
      const cacheID = `${university}-${course}`;

      const data: CurriculumType = await requestDisciplines(university, course);
      setDisciplineMap(new Map(data.disciplines.map((el) => [el.code, el])));

      const tempObligatory: Map<number, DisciplineType[]> = new Map();
      const tempElectives: Map<number, DisciplineType[]> = new Map();
      data.disciplines.forEach((discipline) => {
        const semester = discipline.semester;
        if (discipline.isObligatory) {
          if (!tempObligatory.has(semester)) {
            tempObligatory.set(semester, []);
          }
          tempObligatory.get(semester)?.push(discipline);
        } else {
          if (!tempElectives.has(semester)) {
            tempElectives.set(semester, []);
          }
          tempElectives.get(semester)?.push(discipline);
        }
      });

      setObligatory(tempObligatory);
      setElectives(tempElectives);
      const tempo: Itime | null = await localForage.getItem(`${cacheID}-hours`);
      if (tempo !== null) {
        setAcademicTotalDone(tempo.total);
        setAcademicElectiveDone(tempo.eletiva);
        setAcademicObligatoryDone(tempo.obrigatoria);
      }
      const disciplinesCode: string[] | null = await localForage.getItem(
        `${cacheID}-disciplines`
      );
      if (disciplinesCode !== null) {
        setActiveDisciplines(new Set(disciplinesCode));
      }

      setCurriculum(data);
    }
    loadData();
  }, [params.university, params.course]);

  useEffect(() => {
    if (!academicTotalDone) return;
    const university = params.university as string;
    const course = params.course as string;
    const cacheID = `${university}-${course}`;

    localForage.setItem(`${cacheID}-hours`, {
      total: academicTotalDone,
      eletiva: academicElectiveDone,
      obrigatoria: academicObligatoryDone,
    });
    localForage.setItem(
      `${cacheID}-disciplines`,
      Array.from(activeDisciplines)
    );
  }, [
    academicObligatoryDone,
    academicElectiveDone,
    academicTotalDone,
    activeDisciplines,
    params.university,
    params.course,
  ]);

  return (
    <Box m="5">
      <Header />
      <Navigator />
      <Box w="100%" maxWidth="1700px" maxH="60vh" overflow="scroll">
        {Array.from(obligatory.entries()).map(([semester, disciplines]) => (
          <Grid
            maxW="1600px"
            key={`rows-${semester}`}
            templateColumns="repeat(5, 1fr)"
            gap={1}
          >
            {disciplines.map((item) => (
              <DisciplineBox
                key={item.name}
                id={item.code}
                onClick={handleClick}
                isActive={activeDisciplines.has(item.code)}
                {...item}
              />
            ))}
          </Grid>
        ))}
        <hr style={{ maxWidth: 'calc(100% - 10px)' }} />
        {Array.from(electives.entries()).map(([semester, disciplines]) => (
          <Grid
            maxW="1600px"
            key={`rows-${semester}`}
            templateColumns="repeat(5, 1fr)"
            gap={1}
          >
            {disciplines.map((item) => (
              <DisciplineBox
                key={item.name}
                id={item.code}
                onClick={handleClick}
                isActive={activeDisciplines.has(item.code)}
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
