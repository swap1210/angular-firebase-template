import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { ProfileService } from '../../service/profile.service';
import { ProfilePageStructure } from '../../service/data/all-texts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent implements OnInit {
  firestore = inject(Firestore);
  profileService = inject(ProfileService);
  profileForm: FormGroup = new FormGroup({});
  @Input()
  pageText!: ProfilePageStructure;
  @Output()
  toggleEditMode = new EventEmitter<void>();
  initialFormValues: any = {};
  isFormChanged: boolean = false;
  formSubscription!: Subscription;

  ngOnInit(): void {
    const defaultProfileValue = this.profileService.profileSignal() ?? {
      first_name: '',
      last_name: '',
      language: this.pageText.languages.defaultValue,
    };
    this.profileForm = new FormGroup({
      first_name: new FormControl(defaultProfileValue.first_name, [
        Validators.required,
      ]),
      last_name: new FormControl(defaultProfileValue.last_name, [
        Validators.required,
      ]),
      language: new FormControl(defaultProfileValue.language, [
        Validators.required,
      ]),
    });

    // Store initial values
    this.initialFormValues = this.profileForm.getRawValue();

    // Subscribe to form changes
    this.formSubscription = this.profileForm.valueChanges.subscribe(() => {
      this.isFormChanged = !this.isSameAsInitial();
    });
  }

  isSameAsInitial(): boolean {
    return (
      JSON.stringify(this.profileForm.getRawValue()) ===
      JSON.stringify(this.initialFormValues)
    );
  }

  createProfile = async () => {
    this.profileService
      .createProfileDocument(this.profileForm.getRawValue())
      .then(() => {
        this.toggleEditMode.emit();
      });
  };

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}
