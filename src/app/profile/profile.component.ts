import { Component, inject } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { MatButtonModule } from '@angular/material/button';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  imports: [MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  firestore = inject(Firestore);
  profileService = inject(ProfileService);
  createProfile = async () => {
    this.profileService.createProfileDocument({
      uid: '',
      displayName: null,
      photoURL: null,
      first_name: '',
      last_name: '',
      email: null,
      language: '',
      roles: [],
    });
  };
}
