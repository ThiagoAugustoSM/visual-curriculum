import { useCallback, useState } from 'react';
import { CurriculumType } from '../models/Curriculum';

export default function useCurriculum() {
  const [curriculum, setCurriculum] = useState<
    CurriculumType | Record<string, never>
  >({});
  const [academicTotal, setAcademicTotal] = useState(0);
  const [academicObligatory, setAcademicObligatory] = useState(0);
  const [academicElective, setAcademicElective] = useState(0);

  const updateState = ({ isActive, isObligatory, hours }) => {
    if (isActive) {
      if (isObligatory) {
        setAcademicObligatory(academicObligatory + hours);
      } else {
        setAcademicElective(academicElective + hours);
      }
      setAcademicTotal(academicTotal + hours);
    } else {
      if (isObligatory) {
        setAcademicObligatory(academicObligatory - hours);
      } else {
        setAcademicElective(academicElective - hours);
      }
      setAcademicTotal(academicTotal - hours);
    }
  };

  const loadCurriculum = useCallback(() => {
    fetch('./university/UFPE/engenhariaDaComputacao.json')
      .then((response) => response.json())
      .then((json) => setCurriculum(json));
  }, []);

  return {
    curriculum,
    updateState,
    loadCurriculum,
    completed: {
      academicTotal,
      academicElective,
      academicObligatory,
    },
  };
}
