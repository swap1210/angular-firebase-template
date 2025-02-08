import {
  ApplicationConfig,
  importProvidersFrom,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
('@angular/fire/firestore');
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: '<firebase-apiKey>',
  authDomain: '<firebase-authDomain>',
  projectId: '<firebase-projectId>',
  storageBucket: '<firebase-storageBucket>',
  messagingSenderId: '<firebase-messagingSenderId>',
  appId: '<firebase-appId>',
  measurementId: '<firebase-measurementId>',
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      if (!environment.production) {
        connectAuthEmulator(auth, 'http://127.0.0.1:9099');
      }
      return auth;
    }),
    provideFirestore(() => {
      let firestore: Firestore;
      if (!environment.production) {
        firestore = initializeFirestore(initializeApp(firebaseConfig), {});
        connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      } else {
        firestore = getFirestore();
      }
      return firestore;
    }),
  ],
};
