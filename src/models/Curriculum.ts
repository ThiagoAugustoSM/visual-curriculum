interface IpreRequisites {
  name: string;
  code: string;
}

export type DisciplineType = {
  name: string;
  code: string;
  hours: number;
  credits: number;
  semester: number;
  isActive?: boolean;
  isObligatory: boolean;
  dependents: IpreRequisites[];
  equivalences: IpreRequisites[];
  prerequisites: IpreRequisites[];
};

export type CurriculumType = {
  university: string;
  course: string;
  semesters: number;
  totalHours: number;
  totalHoursElective: number;
  totalHoursObligatory: number;
  disciplines: DisciplineType[];
};

export interface Itime {
  total: number;
  obrigatoria: number;
  eletiva: number;
}

export type HoursSetterFuncTypes = {
  setAcademicObligatoryDone: React.Dispatch<React.SetStateAction<number>>;
  setAcademicElectiveDone: React.Dispatch<React.SetStateAction<number>>;
  setAcademicTotalDone: React.Dispatch<React.SetStateAction<number>>;
};

export type OnClickTypes = {
  isActive: boolean;
  id: string;
  isObligatory: boolean;
  hours: number;
};

export type DisciplineBoxProps = {
  id: string;
  onClick: (params: OnClickTypes) => void;
} & DisciplineType;
