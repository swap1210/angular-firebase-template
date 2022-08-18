import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Injectable()
export class AuthService {
	private user: User | undefined;
	public user$: Observable<any> | undefined;

	constructor(
		private afAuth: AngularFireAuth, // Inject Firebase auth service
		private afs: AngularFirestore, // Inject Firestore service
		private router: Router
	) {
		this.user$ = this.afAuth.authState.pipe(
			switchMap((usr) => {
				console.log('Here at switchMap');
				if (usr) {
					console.log(usr);
					if (!usr.isAnonymous) {
						//if it's end ur for w ur
						return this.afs.doc<User>(`users/${usr.uid}`).valueChanges();
					} else {
						console.log('Here at anonymous login stage');
						return new Promise<User>((res, rej) => {
							let ur: User = {
								Role: Role.Visitor,
							};
							res(ur);
						});
					}
				} else {
					return of(null);
				}
			})
		);
	}

	isAuthorized() {
		return !!this.user;
	}

	hasRole(role: Role) {
		return this.isAuthorized() && this.user?.Role === role;
	}

	anonymousLogin() {
		this.afAuth
			.signInAnonymously()
			.then(() => {
				if (this.user) this.user.Role = Role.Visitor;
				console.log('Anonymous sign in sucess');
				//this.router.navigate(['calculator']);
			})
			.catch(() => {
				console.log('Error signing in anony user');
			});
	}

	login(role: Role) {
		this.user = { Role: role };
	}

	googleSignin() {
		return this.authLogin(new GoogleAuthProvider());
	}

	// Auth logic to run auth providers
	async authLogin(provider: any) {
		return this.afAuth
			.signInWithPopup(provider)
			.then((result) => {
				this.updateUserData(result.user);
			})
			.catch((error) => {
				window.alert(error);
			});
	}

	async updateUserData(user: any) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`
		);

		userRef.get().subscribe({
			next: (oldData) => {
				const data = {};
				if (oldData && user.uid === oldData.get('uid')) {
					// sessionStorage.setItem('language', oldData.get('language'));
					return userRef.set({ last_login: Timestamp.now() }, { merge: true });
				} else {
					//new user then create data entry in firestore
					const { uid, displayName, email } = user;
					return userRef.set(
						{
							uid,
							displayName,
							email,
							last_login: Timestamp.now(),
							role: Role.User,
						},
						{ merge: true }
					);
				}
			},
		});
	}

	logout() {
		this.user = undefined;
		this.afAuth.signOut().then(() => {
			// this.router.navigate(['']);
			console.log('Sign out success');
		});
	}
}
