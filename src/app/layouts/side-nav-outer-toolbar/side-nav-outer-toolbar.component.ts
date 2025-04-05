import {Component, ViewChild} from '@angular/core';
import {ItemClickEvent} from 'devextreme/ui/tree_view';
import {DxScrollViewComponent, DxScrollViewModule} from 'devextreme-angular/ui/scroll-view';
import {HeaderComponent, SideNavigationMenuComponent} from "../../shared/components";
import {DxDrawerModule} from "devextreme-angular";
import {SideNavBaseComponent} from "../side-nav-base/side-nav-base.component";

@Component({
  selector: 'app-side-nav-outer-toolbar',
  templateUrl: './side-nav-outer-toolbar.component.html',
  styleUrls: ['./side-nav-outer-toolbar.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    DxDrawerModule,
    DxScrollViewModule,
    SideNavigationMenuComponent
  ]
})
export class SideNavOuterToolbarComponent extends SideNavBaseComponent {
  @ViewChild(DxScrollViewComponent, {static: true}) scrollView!: DxScrollViewComponent;

  navigationChanged(event: ItemClickEvent) {
    const pathOuter = (event.itemData as any).path;
    const pointerEvent = event.event;

    if (pathOuter && this.menuOpened) {
      if (event.node?.selected) {
        pointerEvent?.preventDefault();
      } else {
        this.router.navigate([pathOuter]).then();
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
