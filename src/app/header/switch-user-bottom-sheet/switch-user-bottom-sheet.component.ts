import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router, RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-switch-user-bottom-sheet',
  imports: [MatListModule, RouterModule, MatRippleModule, MatIconModule],
  templateUrl: './switch-user-bottom-sheet.component.html',
  styleUrl: './switch-user-bottom-sheet.component.scss',
})
export class SwitchUserBottomSheetComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  private _bottomSheetRef =
    inject<MatBottomSheetRef<SwitchUserBottomSheetComponent>>(
      MatBottomSheetRef
    );

  navigateTo(event: MouseEvent, routePath: string): void {
    this.router.navigate([routePath]);
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
