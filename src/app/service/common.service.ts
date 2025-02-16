import { Injectable } from '@angular/core';
import { all_texts, rolesTabPageText } from './data/all-texts';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  all_texts = all_texts;
  rolesTabPageText = rolesTabPageText;
}
