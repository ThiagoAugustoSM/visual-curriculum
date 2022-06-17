import { HoursSetterFuncTypes } from '../models/Curriculum';

function setAcademicHours(
  props: HoursSetterFuncTypes,
  active: boolean,
  obligatory: boolean,
  hours: number
): void {
  if (active) {
    if (obligatory) {
      props.setAcademicObligatoryDone((prevState) => prevState + hours);
    } else {
      props.setAcademicElectiveDone((prevState) => prevState + hours);
    }
    props.setAcademicTotalDone((prevState) => prevState + hours);
  } else {
    if (obligatory) {
      props.setAcademicObligatoryDone((prevState) => prevState - hours);
    } else {
      props.setAcademicElectiveDone((prevState) => prevState - hours);
    }
    props.setAcademicTotalDone((prevState) => prevState - hours);
  }
}

export default setAcademicHours;
