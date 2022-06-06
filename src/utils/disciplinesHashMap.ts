import disciplineData from './requestDisciplines';

const disciplineHashMap = new Map();

disciplineData.then((res) => {
  res.disciplines.forEach((discipline) => {
    disciplineHashMap.set(discipline.code, discipline);
  });
});

export default disciplineHashMap;
