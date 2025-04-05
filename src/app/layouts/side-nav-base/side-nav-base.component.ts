import {Component, inject, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {ScreenService} from "../../shared/services";

@Component({
  selector: 'app-side-nav-base',
  template: ``,
  standalone: true
})
export class SideNavBaseComponent implements OnInit {
  // injects
  protected screen: ScreenService = inject(ScreenService);
  protected router: Router = inject(Router);

  // inputs
  @Input() title!: string;

  // vars
  selectedRoute = '';
  menuOpened!: boolean;
  menuMode = 'shrink';
  menuRevealMode = 'expand';
  minMenuSize = 0;
  shaderEnabled = false;
  temporaryMenuOpened = false;

  ngOnInit() {
    this.menuOpened = this.screen.sizes['screen-large'];

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.selectedRoute = val.urlAfterRedirects.split('?')[0];
      }
    });

    this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }

  updateDrawer() {

    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 60;
    this.shaderEnabled = !isLarge;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }

}
