export type DisciplineType = {
  name: string;
  code: string;
  prerequisites: [string];
  semester: number;
  hours: number;
  credits: number;
  isObligatory: true;
};

export type CurriculumType = {
  university: string;
  course: string;
  semesters: number;
  totalHours: number;
  totalHoursObligatory: number;
  totalHoursElective: number;
  disciplines: [DisciplineType];
};
