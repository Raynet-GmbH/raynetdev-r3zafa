import {Component, ViewChild} from '@angular/core';
import {ItemClickEvent as TreeViewItemClickEvent} from 'devextreme/ui/tree_view';
import {ItemClickEvent as ToolbarItemClickEvent} from 'devextreme/ui/toolbar';
import {DxScrollViewComponent, DxScrollViewModule} from 'devextreme-angular/ui/scroll-view';
import {DxDrawerModule, DxToolbarModule} from "devextreme-angular";
import {HeaderComponent, SideNavigationMenuComponent} from "../../shared/components";
import {NgIf} from "@angular/common";
import {SideNavBaseComponent} from "../side-nav-base/side-nav-base.component";

@Component({
  selector: 'app-side-nav-inner-toolbar',
  templateUrl: './side-nav-inner-toolbar.component.html',
  standalone: true,
  imports: [
    DxDrawerModule,
    DxToolbarModule,
    HeaderComponent,
    DxScrollViewModule,
    NgIf,
    SideNavigationMenuComponent
  ],
  styleUrls: ['./side-nav-inner-toolbar.component.scss']
})
export class SideNavInnerToolbarComponent extends SideNavBaseComponent {
  @ViewChild(DxScrollViewComponent, {static: true}) scrollView!: DxScrollViewComponent;


  toggleMenu = (e: ToolbarItemClickEvent) => {
    this.menuOpened = !this.menuOpened;
    e.event?.stopPropagation();
  }

  navigationChanged(event: TreeViewItemClickEvent) {
    const path = (event.itemData as any).path;
    const pointerEvent = event.event;

    if (path && this.menuOpened) {
      if (event.node?.selected) {
        pointerEvent?.preventDefault();
      } else {
        this.router.navigate([path]).then();
        this.scrollView.instance.scrollTo(0);
      }

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent?.stopPropagation();
      }
    } else {
      pointerEvent?.preventDefault();
    }
  }

}
