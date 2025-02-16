import { FirebaseOptions } from '@angular/fire/app';

export type FixedEnvironmentStructure = {
  AppTitle: string;
  production: boolean;
  apiUrl: string;
  firebaseConfig: FirebaseOptions;
};
