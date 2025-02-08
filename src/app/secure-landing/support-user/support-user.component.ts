import { Component, inject } from '@angular/core';
import { MetadataService } from '../../service/metadata.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-support-user',
  imports: [],
  templateUrl: './support-user.component.html',
  styleUrl: './support-user.component.scss',
})
export class SupportUserComponent {
  metadataService = inject(MetadataService);
}
