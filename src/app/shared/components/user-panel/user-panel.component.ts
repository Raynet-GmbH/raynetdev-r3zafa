import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DxListModule} from 'devextreme-angular/ui/list';
import {DxContextMenuModule} from 'devextreme-angular/ui/context-menu';
import {IUser} from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  standalone: true,
  imports: [
    DxListModule,
    DxContextMenuModule,
    CommonModule]
})

export class UserPanelComponent {
  @Input() menuItems: any;
  @Input() menuMode!: string;
  @Input() user!: IUser | null;
}
