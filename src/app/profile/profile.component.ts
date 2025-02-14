import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonService } from '../service/common.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileReadonlyComponent } from './profile-readonly/profile-readonly.component';
import { ProfileService } from '../service/profile.service';
@Component({
  selector: 'app-profile',
  imports: [
    MatButtonModule,
    MatIconModule,
    ProfileEditComponent,
    ProfileReadonlyComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  commonService = inject(CommonService);
  profileService = inject(ProfileService);
  pageText = this.commonService.all_texts.profile;
  editMode: boolean = false;
}
