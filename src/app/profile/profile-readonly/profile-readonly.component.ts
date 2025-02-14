import { Component, Input } from '@angular/core';
import { ProfilePageStructure } from '../../service/data/all-texts';
import { ProfileDocumentInterface } from '../../service/data/user.interface';

@Component({
  selector: 'app-profile-readonly',
  imports: [],
  templateUrl: './profile-readonly.component.html',
  styleUrl: './profile-readonly.component.scss',
})
export class ProfileReadonlyComponent {
  languageEquivalentValue = (): string => {
    const valueFound = this.pageText.languages.options.find(
      (option) => option.value === this.profileData?.language
    );
    if (valueFound) {
      return valueFound.viewValue;
    }
    return '';
  };
  @Input()
  pageText!: ProfilePageStructure;
  @Input()
  profileData: ProfileDocumentInterface | null = null;
}
