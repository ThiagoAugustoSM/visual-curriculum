import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { CurriculumType } from '../models/Curriculum';
import Service from './service';

export default function useCurriculum() {
  const { params } = useRouteMatch<{ university: string; course: string }>();

  const [curriculum, setCurriculum] = useState<
    CurriculumType | Record<string, never>
  >({});
  const [academicTotal, setAcademicTotal] = useState(0);
  const [academicObligatory, setAcademicObligatory] = useState(0);
  const [academicElective, setAcademicElective] = useState(0);
  const service = useMemo(() => new Service(), []);

  useEffect(() => {
    service.setCurrent(params.university, params.course);
  }, [params, service]);

  const updateState = ({ isActive, isObligatory, hours }): void => {
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

  const loadCurriculum = useCallback(async () => {
    const data = await service.loadCurriculum();
    setCurriculum(data);
  }, [service]);

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
