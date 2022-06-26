import { University } from '../models/University';

function requestUniversities() {
  const universitiesData: Promise<University[]> = fetch(
    `${process.env.PUBLIC_URL}/university/university.json`
  ).then((response) => response.json());
  return universitiesData;
}

export default requestUniversities;
