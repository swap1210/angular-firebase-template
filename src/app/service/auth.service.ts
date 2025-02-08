import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import {
  getRoleFromString,
  getTM_LoginTypeForSignedInUser,
  TM_LoginType,
  TM_Role,
  UserDocumentInterface,
  UserInterface,
} from '../user.interface';
import {
  Firestore,
  Unsubscribe,
  doc,
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import {
  ALL_ROUTES,
  LOGIN_ROUTE,
  SECURE_HOME_ROUTE,
  TM_Route,
} from './data/all-routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);

  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<UserInterface | null | undefined>(undefined);
  currentUserDocumentSignal = signal<UserDocumentInterface | null | undefined>(
    undefined
  );
  hasUserDocumentSignal: Signal<boolean> = computed(() => {
    return (
      this.currentUserDocumentSignal() !== undefined &&
      this.currentUserDocumentSignal() !== null
    );
  });
  currentUserRoleRoutesSignal: Signal<TM_Route[]> = computed(() => {
    const userRoles = this.currentUserDocumentSignal()?.roles;

    if (userRoles) {
      return ALL_ROUTES.filter((route) =>
        userRoles!.includes(getRoleFromString(route.key)!)
      );
    }
    return [];
  });

  private userDocUnsubscribe: Unsubscribe | null = null; // Store Firestore listener unsubscribe function

  constructor() {
    console.count("AuthService constructor can't be more than 1: ");

    this.user$.subscribe((user) => {
      if (user) {
        console.debug('User logged in:', user);
        this.currentUserSignal.set({
          email: user.email!,
          displayName: user.displayName!,
        });
        this.router.navigate([SECURE_HOME_ROUTE]);

        // Start listening to Firestore user document changes
        this.listenToUserDocumentAndCreateIfNotExist(user);
      } else {
        console.debug('User logged out');
        this.currentUserSignal.set(null);
        this.router.navigate([LOGIN_ROUTE]);

        // Stop Firestore listener
        this.unsubscribeUserDocument();
        this.currentUserDocumentSignal.set(null);
      }
      console.debug('UserSignal:', this.currentUserSignal());
    });
  }

  register = (email: string, password: string): Observable<void> => {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      this.asyncRegisterReaction(response, TM_LoginType.EMAIL)
    );
    return from(promise);
  };

  registerOrLoginWithGoogle = (isLoginMode: boolean): Observable<void> => {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then(
      isLoginMode
        ? () => {
            console.debug(
              "Check if document doesn't exist for user in collection create new user document"
            );
          }
        : (response) =>
            this.asyncRegisterReaction(response, TM_LoginType.GOOGLE)
    );
    return from(promise);
  };

  asyncRegisterReaction = async (
    loginUserResponse: UserCredential,
    currentLoginType: TM_LoginType
  ) => {
    await updateProfile(loginUserResponse.user, {
      displayName: loginUserResponse.user.email,
    });

    // Reference to Firestore document with UID as document ID
    const userDocRef = doc(
      this.firestore,
      `users/${loginUserResponse.user.uid}`
    );

    // prepare UserDocumentInterface Object
    const userDoc: UserDocumentInterface = {
      uid: loginUserResponse.user.uid,
      email: loginUserResponse.user.email,
      displayName: loginUserResponse.user.displayName,
      photoURL: loginUserResponse.user.photoURL,
      roles: [TM_Role.CLIENT],
      login_type: currentLoginType,
      first_name: '',
      last_name: '',
      language: 'en-US',
      last_login: '',
    };

    // Insert user data into Firestore
    await setDoc(userDocRef, userDoc, { merge: true }); // Merge true ensures we don't overwrite existing data
  };

  login = (email: string, password: string): Observable<void> => {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  };

  logOut = (): Observable<void> => {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  };

  isAuthenticated = (): boolean => {
    return this.currentUserSignal() !== undefined && this.user$ !== null;
  };

  private listenToUserDocumentAndCreateIfNotExist(signedInUser: User): void {
    const userDocRef = doc(this.firestore, `users/${signedInUser.uid}`);

    // Ensure any existing listener is unsubscribed before setting up a new one
    this.unsubscribeUserDocument();

    this.userDocUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        console.debug('User document:', docSnap.data());
        this.currentUserDocumentSignal.set(
          docSnap.data() as UserDocumentInterface
        );
      } else {
        console.debug('User document does not exist');
        this.currentUserDocumentSignal.set(null);
        console.debug('Trying to create User document now');

        // prepare UserDocumentInterface Object
        const userDoc: UserDocumentInterface = {
          uid: signedInUser.uid,
          email: signedInUser.email,
          displayName: signedInUser.displayName,
          photoURL: signedInUser.photoURL,
          roles: [TM_Role.CLIENT],
          login_type: getTM_LoginTypeForSignedInUser(signedInUser.providerData), //this may cause issue for
          first_name: '',
          last_name: '',
          language: 'en-US',
          last_login: '',
        };
        // Insert user data into Firestore
        setDoc(userDocRef, userDoc, { merge: true }); // Merge true ensures we don't overwrite existing data
      }
      console.debug('UserDocumentSignal:', this.currentUserDocumentSignal());
    });
  }

  private unsubscribeUserDocument(): void {
    if (this.userDocUnsubscribe) {
      this.userDocUnsubscribe(); // Call the unsubscribe function
      this.userDocUnsubscribe = null;
      console.debug('Firestore listener unsubscribed.');
    }
  }
}
