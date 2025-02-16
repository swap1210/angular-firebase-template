import {
  Component,
  effect,
  inject,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import {
  getRouteObjFromPath,
  SECURE_HOME_ROUTE,
  App_Route,
} from '../service/data/all-routes';
import { ProfileService } from '../service/profile.service';
import { CommonService } from '../service/common.service';
import { Tab } from '../service/data/all-texts';
import { MatIconModule } from '@angular/material/icon';
import { SecureLandingService } from '../service/secure-landing.service';

@Component({
  selector: 'app-secure-landing',
  templateUrl: './secure-landing.component.html',
  styleUrl: './secure-landing.component.scss',
  imports: [MatTabsModule, MatIconModule],
})
export class SecureLandingComponent implements OnInit {
  SECURE_HOME_ROUTE_OBJ: App_Route | null =
    getRouteObjFromPath(SECURE_HOME_ROUTE);
  authService = inject(AuthService);
  profileService = inject(ProfileService); // Assuming you have a profile service
  commonService = inject(CommonService);
  secureLandingService = inject(SecureLandingService);
  viewContainerRef = inject(ViewContainerRef);
  tabs: Tab[] = [];

  roleLoadEffect = effect(() => {
    const currentRole = this.secureLandingService.currentRole();
    if (currentRole) {
      this.tabs = this.commonService.rolesTabPageText[currentRole].tabs;
    } else {
      // Fallback to default role if currentRole is undefined
      const firstRoleRoute = this.profileService.roleRouteSignal();
      if (firstRoleRoute && firstRoleRoute.length > 0) {
        this.tabs = this.commonService.rolesTabPageText[firstRoleRoute[0]].tabs;
      }
    }
  });

  ngOnInit() {
    if (this.tabs.length > 0) {
      this.loadComponent(this.tabs[0]);
    }
  }

  loadComponent(tab: Tab) {
    this.viewContainerRef.clear();
    const ref = this.viewContainerRef.createComponent<any>(tab.component);

    // Pass on the props
    for (const prop in tab.data) {
      if (Object.prototype.hasOwnProperty.call(ref.instance, prop)) {
        ref.instance[prop] = tab.data[prop];
      }
    }
  }

  onTabSelected(index: number) {
    this.loadComponent(this.tabs[index]);
  }
}
