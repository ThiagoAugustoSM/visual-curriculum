import { CurriculumType } from '../models/Curriculum';

const disciplineData = fetch('http://localhost:3000/api').then<CurriculumType>(
  (response) => response.json()
);
export default disciplineData;
