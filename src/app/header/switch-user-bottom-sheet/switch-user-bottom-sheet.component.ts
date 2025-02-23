import { Component, computed, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router, RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../service/profile.service';
import { CommonService } from '../../service/common.service';
import { getRoleFromString } from '../../service/data/user.interface';

@Component({
  selector: 'app-switch-user-bottom-sheet',
  imports: [MatListModule, RouterModule, MatRippleModule, MatIconModule],
  templateUrl: './switch-user-bottom-sheet.component.html',
  styleUrl: './switch-user-bottom-sheet.component.scss',
})
export class SwitchUserBottomSheetComponent {
  private router = inject(Router);
  profileService = inject(ProfileService);
  commonService = inject(CommonService);
  pageText = this.commonService.all_texts.switchUserBottomSheet;
  userRoles = computed(() => {
    return this.pageText.userRoles.filter((currentRole) => {
      const roleEnum = getRoleFromString(currentRole.key);
      if (roleEnum)
        return this.profileService.roleRouteSignal().includes(roleEnum);
      return false;
    });
  });

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
