import {IEmployee} from "../interfaces/employee.interface";

export type ScreenSizeType = 'xs' | 'sm' | 'md' | 'lg';

export const defaultEmployeeValues: IEmployee = {
  ID: 0,
  DisplayName: '',
  FirstName: '',
  LastName: '',
  PhoneNumber: '',
  Prefix: '',
  Position: '',
  Picture: '',
  BirthDate: null,
  HireDate: null,
  AssignedTasks: 0,
  Notes: '',
  Address: ''
};

export const defaultColumnCountValues: Record<ScreenSizeType, number> = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4
};
