import { Component, inject } from '@angular/core';
import { MetadataService } from '../../service/metadata.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { ClientUserComponent } from '../client-user/client-user.component';
import { TicketMasterComponent } from './ticket-master/ticket-master.component';

@Component({
  selector: 'app-support-user',
  imports: [
    MatTabsModule,
    MatIconModule,
    UserManagerComponent,
    ClientUserComponent,
    TicketMasterComponent,
  ],
  templateUrl: './support-user.component.html',
  styleUrl: './support-user.component.scss',
})
export class SupportUserComponent {
  metadataService = inject(MetadataService);
}
