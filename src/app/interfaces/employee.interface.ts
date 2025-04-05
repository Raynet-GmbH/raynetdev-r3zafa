export interface IEmployee {
  ID: number;
  DisplayName: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Prefix: string;
  Position: string;
  Picture: string;
  BirthDate: Date | string | null;
  HireDate: Date | string | null;
  AssignedTasks: number;
  Notes: string;
  Address: string;
}
