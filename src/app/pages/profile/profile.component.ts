import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services";
import {IEmployee} from "../../interfaces/employee.interface";
import {GetUserResponseInterface} from "../../interfaces/get-user-response.interface";

const defaultEmployeeValues: IEmployee = {
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

const defaultColumnCountValues: Record<'xs' | 'sm' | 'md' | 'lg', number> = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4
};

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // injects
  private authService: AuthService = inject(AuthService);

  // vars
  employee: IEmployee = defaultEmployeeValues;
  colCountByScreen: Record<'xs' | 'sm' | 'md' | 'lg', number> = defaultColumnCountValues;

  async ngOnInit() {
    const res: GetUserResponseInterface = await this.authService.getUser();

    this.employee = {
      ID: 7,
      DisplayName: res?.data?.displayName ?? '',
      FirstName: 'Sandra',
      LastName: 'Johnson',
      PhoneNumber: res?.data?.phoneNumber ?? '',
      Prefix: 'Mrs.',
      Position: 'Controller',
      Picture: 'images/employees/06.png',
      BirthDate: new Date('1974/11/5').toISOString().split('T')[0],
      HireDate: new Date('2005/05/11').toISOString().split('T')[0],
      AssignedTasks: 33,
      Notes: 'Sandra is a CPA and has been our controller since 2008. She loves to interact with staff...',
      Address: '4600 N Virginia Rd.'
    };
  }
}
