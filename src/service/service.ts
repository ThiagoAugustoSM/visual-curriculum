/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import { CurriculumType } from '../models/Curriculum';

export default class Service {
  currentUniversity = '';

  currentCourse = '';

  setCurrent(university: string, course: string): void {
    this.currentUniversity = university;
    this.currentCourse = course;
  }

  async loadCurriculum(
    university: string,
    course: string
  ): Promise<CurriculumType | Record<string, never>> {
    try {
      const response = await fetch(`/university/${university}/${course}.json`);
      return await (response.json() as Promise<CurriculumType>);
    } catch (err) {
      console.error(err);
      return {};
    }
  }
}
