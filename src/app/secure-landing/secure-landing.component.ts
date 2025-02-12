import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {
  getRouteObjFromPath,
  SECURE_HOME_ROUTE,
  TM_Route,
} from '../service/data/all-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure-landing',
  templateUrl: './secure-landing.component.html',
  styleUrl: './secure-landing.component.scss',
})
export class SecureLandingComponent {
  SECURE_HOME_ROUTE_OBJ: TM_Route | null =
    getRouteObjFromPath(SECURE_HOME_ROUTE);
  router = inject(Router);
  authService = inject(AuthService);
  // firstRouteFinderEffect =
  // effect(() => {
  //   const firstRoleRoute =
  //     this.authService.currentUserRoleRoutesSignal()?.[0];
  //   if (firstRoleRoute) {
  //     console.log(`Navigating to: ${firstRoleRoute.path}`);
  //     this.router.navigate([firstRoleRoute.path]);
  //   } else {
  //     console.log('No role-based routes found, navigating to default route.');
  //   }
  // });

  constructor() {
    console.count("SecureLandingComponent constructor can't be more than 1: ");
  }
}
