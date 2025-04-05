import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services';
import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxToolbarModule} from 'devextreme-angular/ui/toolbar';
import {Router} from '@angular/router';
import {IUser} from '../../../interfaces/user.interface';
import {UserPanelComponent} from "../user-panel/user-panel.component";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    DxToolbarModule,
    NgIf,
    DxButtonModule,
    UserPanelComponent
  ]
})

export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<boolean>();
  @Input() menuToggleEnabled = false;
  @Input() title!: string;

  user: IUser | null = {email: '', phoneNumber: '', displayName: ''};

  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']).then();
    }
  },
    {
      text: 'Logout',
      icon: 'runner',
      onClick: () => {
        this.authService.logOut().then();
      }
    }];

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}
