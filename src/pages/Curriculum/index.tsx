import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Grid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import Navigator from '../../components/Navigator';
import DisciplineBox from '../../components/DisciplineBox';
import StatsContainer from '../../components/StatsContainer';
import Search from '../../components/Search';
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
  const [searchValue, setSearchValue] = useState('');

  const params = useParams();

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

  const setters = {
    setAcademicObligatoryDone,
    setAcademicElectiveDone,
    setAcademicTotalDone,
  };

  function fillOrCleanPreRequisites(
    goalDiscipline: string,
    isToFill: boolean
  ): void {
    const disciplineQueue = [goalDiscipline];
    const disciplinesToModify = new Set<string>();

    while (disciplineQueue.length > 0) {
      const disciplineCode = disciplineQueue[0];
      const discipline = disciplineMap.get(disciplineCode);
      disciplineQueue.splice(0, 1);
      if (!discipline) {
        continue;
      }
      setAcademicHours(
        setters,
        isToFill,
        discipline.isObligatory,
        discipline.hours
      );
      disciplinesToModify.add(disciplineCode);
      const disciplineList = isToFill
        ? discipline.prerequisites
        : discipline.dependents;
      disciplineList.forEach((prerequisite) => {
        if (
          ((isToFill && !activeDisciplines.has(prerequisite.code)) ||
            (!isToFill && activeDisciplines.has(prerequisite.code))) &&
          !disciplinesToModify.has(prerequisite.code) &&
          disciplineQueue.indexOf(prerequisite.code) === -1
        ) {
          disciplineQueue.push(prerequisite.code);
        }
      });
    }
    setActiveDisciplines((currentDisciplines) => {
      disciplinesToModify.forEach((element) => {
        if (isToFill) {
          currentDisciplines.add(element);
        } else {
          currentDisciplines.delete(element);
        }
      });
      return currentDisciplines;
    });
  }

  const handleClick = (props: OnClickTypes) => {
    const { id, isActive } = props;
    if (isActive) {
      fillOrCleanPreRequisites(id, true);
    } else {
      fillOrCleanPreRequisites(id, false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box m="5">
      <Header />
      <Navigator
        university={curriculum.university}
        course={curriculum.course}
      />
      <Box w="100%" flexWrap="wrap" mb={12}>
        <Search onChange={handleSearch}></Search>

        {Array.from(obligatory.entries()).map(([semester, disciplines]) => (
          <Grid key={`rows-${semester}`} display="flex" flexWrap="wrap">
            {disciplines.map(
              (item) =>
                (item.name
                  .toLocaleLowerCase()
                  .includes(searchValue.toLocaleLowerCase()) ||
                  item.code
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase())) && (
                  <DisciplineBox
                    key={item.code}
                    id={item.code}
                    onClick={handleClick}
                    isActive={activeDisciplines.has(item.code)}
                    {...item}
                  />
                )
            )}
          </Grid>
        ))}
        <hr style={{ maxWidth: 'calc(100% - 10px)' }} />
        {Array.from(electives.entries()).map(([semester, disciplines]) => (
          <Grid key={`rows-${semester}`} display="flex" flexWrap="wrap">
            {disciplines.map(
              (item) =>
                (item.name
                  .toLocaleLowerCase()
                  .includes(searchValue.toLocaleLowerCase()) ||
                  item.code
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase())) && (
                  <DisciplineBox
                    key={item.code}
                    id={item.code}
                    onClick={handleClick}
                    isActive={activeDisciplines.has(item.code)}
                    {...item}
                  />
                )
            )}
          </Grid>
        ))}
      </Box>
      <Accordion
        allowToggle
        width="100%"
        position="fixed"
        bottom="0"
        bg="var(--chakra-colors-chakra-body-bg)"
        left="0"
        boxShadow="0px -2px 5px #eee"
      >
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton>
                {isExpanded ? (
                  <Box margin="auto">Esconder</Box>
                ) : (
                  <Box margin="auto">Mostrar</Box>
                )}
              </AccordionButton>
              <AccordionPanel>
                <SimpleGrid columns={[1, 2]} spacing="5">
                  <StatsContainer
                    academicTotal={academicTotalDone}
                    academicObligatory={academicObligatoryDone}
                    academicElective={academicElectiveDone}
                    totalHours={curriculum.totalHours}
                    totalHoursObligatory={curriculum.totalHoursObligatory}
                    totalHoursElective={curriculum.totalHoursElective}
                  />
                  <NextSteps />
                </SimpleGrid>
                <Footer />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
