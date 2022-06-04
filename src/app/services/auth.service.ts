import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $loginData = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    if (sessionStorage.getItem('AnonymousLogin')) {
      sessionStorage.setItem('AnonymousLogin', 'set');
      this.$loginData.next(true);
    }
  }

  public signIn = () => {
    sessionStorage.setItem('AnonymousLogin', 'set');
    this.$loginData.next(true);
    this.router.navigate(['/calculator']);
  };

  public signOut = () => {
    sessionStorage.removeItem('AnonymousLogin');
    this.$loginData.next(false);
  };
}
