import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '../service/data/all-routes';
import { ProfileService } from '../service/profile.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAndProfileAuthGuard implements CanActivate {
  router = inject(Router);
  profileService = inject(ProfileService);
  profileSignal$ = toObservable(this.profileService.profileSignal);

  canActivate(): Observable<boolean> {
    return this.profileSignal$.pipe(
      map((profile) => {
        if (!profile) {
          this.router.navigate([PROFILE_ROUTE]);
          return false;
        }
        return true;
      })
    );
  }
}
