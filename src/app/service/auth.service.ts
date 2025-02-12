import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Auth, updateProfile, User, user } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { SECURE_HOME_ROUTE } from './data/all-routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);

  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
  user$ = user(this.firebaseAuth);
  userSignal = signal<User | null | undefined>(undefined);
  isAuthenticatedSignal: Signal<boolean> = computed(() => {
    return (
      this.userSignal() !== undefined &&
      this.userSignal() !== null &&
      this.user$ !== null
    );
  });

  constructor() {
    console.count("AuthService constructor can't be more than 1: ");

    this.user$.subscribe((user) => {
      if (user) {
        console.debug('User logged in:', user);
        this.userSignal.set(user);
        this.router.navigate([SECURE_HOME_ROUTE]);
      } else {
        console.debug('User logged out');
        this.userSignal.set(null);
      }
      console.debug('UserSignal:', this.userSignal());
    });
  }
}
