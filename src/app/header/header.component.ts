import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SwitchUserBottomSheetComponent } from './switch-user-bottom-sheet/switch-user-bottom-sheet.component';
import { SECURE_HOME_ROUTE } from '../service/data/all-routes';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  SECURE_HOME_ROUTE = SECURE_HOME_ROUTE;
  authService = inject(AuthService);
  hasMultipleRoles: Signal<boolean> = computed(() => {
    return this.authService.currentUserRoleRoutesSignal().length > 1;
  });
  private _bottomSheet = inject(MatBottomSheet);

  onLogout() {
    this.authService.logOut();
  }
  @Input()
  title!: string;
  @Output() sideNavToggleEventEmitter = new EventEmitter<void>();

  triggerSideNavToggle = () => {
    this.sideNavToggleEventEmitter.emit();
  };

  onSwitchUser() {
    this._bottomSheet.open(SwitchUserBottomSheetComponent);
  }
}
