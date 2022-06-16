interface IpreRequisites {
  name: string;
  code: string;
}

export type DisciplineType = {
  name: string;
  code: string;
  prerequisites: IpreRequisites[];
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
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DisciplineBoxProps = {
  id: string;
  onClick: (params: OnClickTypes) => boolean;
} & DisciplineType;
