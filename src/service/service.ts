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
    key = ''
  ): Promise<CurriculumType | Record<string, never>> {
    try {
      const response = await fetch(
        '/university/UFPE/engenharia-da-computacao.json'
      );
      return response.json() as Promise<CurriculumType>;
    } catch (err) {
      console.error(err);
      return {};
    }
  }
}
