import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Raynet Frontend Angular Exercises';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
