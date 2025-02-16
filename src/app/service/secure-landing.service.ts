import { Injectable, Signal, signal } from '@angular/core';
import { App_Role } from './data/user.interface';

@Injectable({
  providedIn: 'root',
})
export class SecureLandingService {
  currentRole = signal<App_Role | undefined>(undefined);
}
