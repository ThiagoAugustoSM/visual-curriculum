import { CurriculumType } from '../models/Curriculum';

function requestDisciplines(university: string, course: string) {
  const disciplineData: Promise<CurriculumType> = fetch(
    `${process.env.PUBLIC_URL}/university/${university}/${course}.json`
  ).then((response) => response.json());
  return disciplineData;
}

export default requestDisciplines;
