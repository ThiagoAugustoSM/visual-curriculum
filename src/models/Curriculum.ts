export type DisciplineType = {
  name: string;
  code: string;
  prerequisites: [string];
  semester: number;
  hours: number;
  credits: number;
  isObligatory: true;
  isActive: boolean;
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

export interface Itime {
  total: number;
  obrigatoria: number;
  eletiva: number;
}

export type OnClickTypes = {
  isActive: boolean;
  id: string;
  isObligatory: boolean;
  hours: number;
};
