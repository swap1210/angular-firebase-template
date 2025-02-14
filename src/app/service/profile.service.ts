import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import {
  InputProfileDocumentInterface,
  ProfileDocumentInterface,
  TM_Role,
} from './data/user.interface';
import {
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  firebaseUser$ = toObservable(this.authService.userSignal);
  profileSignal = signal<ProfileDocumentInterface | null>(null);
  roleRouteSignal: Signal<TM_Role[]> = computed(() => {
    if (this.profileSignal()) {
      return this.profileSignal()!.roles;
    } else {
      return [];
    }
  });

  constructor() {
    this.firebaseUser$.subscribe(async (user) => {
      console.log('firebaseUser$ received: ', user);
      if (user) {
        const profileRef = this.returnProfileDocumentReference(user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          this.profileSignal.set(
            profileSnap.data() as ProfileDocumentInterface
          );
        } else {
          this.profileSignal.set(null);
        }
      } else {
        this.profileSignal.set(null);
      }
    });
  }

  clearProfileSignal() {
    this.profileSignal.set(null);
  }

  createProfileDocument = async (
    inputProfileDocument: InputProfileDocumentInterface
  ): Promise<void> => {
    //for null checked value
    const firebaseUser = this.authService.userSignal();

    if (!firebaseUser) {
      throw new Error('No user is currently logged in');
    }

    // Reference to Firestore document with UID as document ID
    const profileDocumentRef = this.returnProfileDocumentReference(
      firebaseUser.uid
    );

    // Prepare ProfileDocumentInterface Object
    const firstOption: ProfileDocumentInterface = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      roles: [TM_Role.CLIENT],
      first_name: inputProfileDocument.first_name || 'NA',
      last_name: inputProfileDocument.last_name || 'NA',
      language: inputProfileDocument.language || 'en-US',
    };
    const resultantProfileDocument: ProfileDocumentInterface = Object.assign(
      {},
      firstOption, //first field value priority
      inputProfileDocument //second field value priority
    );

    // Insert user data into Firestore
    await setDoc(profileDocumentRef, resultantProfileDocument, { merge: true });
  };

  returnProfileDocumentReference = (
    uid: string
  ): DocumentReference<DocumentData, DocumentData> => {
    return doc(this.firestore, `profiles/${uid}`);
  };
}
