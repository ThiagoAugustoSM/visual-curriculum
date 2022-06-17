import { CurriculumType, DisciplineType } from '../models/Curriculum';

function getDisciplineHashMap(
  curriculum: CurriculumType
): Map<string, DisciplineType> {
  const disciplineHashMap = new Map();

  curriculum.disciplines.forEach((discipline) => {
    disciplineHashMap.set(discipline.code, discipline);
  });

  return disciplineHashMap;
}

export default getDisciplineHashMap;
