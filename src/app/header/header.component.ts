import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SwitchUserBottomSheetComponent } from './switch-user-bottom-sheet/switch-user-bottom-sheet.component';
import {
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SECURE_HOME_ROUTE,
} from '../service/data/all-routes';
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '@angular/fire/auth';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);
  firebaseAuth = inject(Auth);
  SECURE_HOME_ROUTE = SECURE_HOME_ROUTE;
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  hasMultipleRoles: Signal<boolean> = computed(() => {
    if (this.profileService.roleRouteSignal())
      return this.profileService.roleRouteSignal().length > 1;
    else return false;
  });
  private _bottomSheet = inject(MatBottomSheet);

  @Input()
  title!: string;
  @Output() sideNavToggleEventEmitter = new EventEmitter<void>();

  triggerSideNavToggle = () => {
    this.sideNavToggleEventEmitter.emit();
  };
  PROFILE_ROUTE = PROFILE_ROUTE;

  onSwitchUser() {
    if (this.hasMultipleRoles() === false) {
      return;
    }
    this._bottomSheet.open(SwitchUserBottomSheetComponent);
  }
  onLogout() {
    this.firebaseAuth.signOut().then(() => {
      this.profileService.clearProfileSignal();
      this.router.navigate([LOGIN_ROUTE]);
    });
  }
}
