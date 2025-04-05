import {Component} from '@angular/core';
import 'devextreme/data/odata/store';
import {DxDataGridModule} from "devextreme-angular";
import {CommonModule} from "@angular/common";

@Component({
  templateUrl: 'tasks.component.html',
  standalone: true,
  imports: [
    DxDataGridModule,
    CommonModule
  ],
})

export class TasksComponent {
  dataSource: any;
  priority: any[] = [];

  constructor() {

    this.dataSource = {
      store: {
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name'
      ]
    };

    const priority = [
      {name: 'High', value: 4},
      {name: 'Urgent', value: 3},
      {name: 'Normal', value: 2},
      {name: 'Low', value: 1}
    ];

  }
}
