import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../service/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { LOGIN_ROUTE, ROOT_ROUTE } from '../service/data/all-routes';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class RegisterComponent implements OnInit {
  firebaseAuth = inject(Auth);
  isDevelopment = !environment.production;
  http = inject(HttpClient);

  authService = inject(AuthService);
  cs = inject(CommonService);

  registerForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  LOGIN_ROUTE: string = LOGIN_ROUTE;
  ROOT_ROUTE = ROOT_ROUTE;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.isDevelopment) {
      this.registerForm.setValue({
        email: 'test1@gmail.com',
        password: 'Test1Pass',
      });
    }
  }

  onSubmit(): void {
    console.log('registering');
    const rawForm = this.registerForm.getRawValue();
    if (this.registerForm.invalid) return;

    createUserWithEmailAndPassword(
      this.firebaseAuth,
      rawForm.email,
      rawForm.password
    )
      .then(() => {
        console.log('register success!');
      })
      .catch((err) => {
        this.errorMessage = 'Failed to register: ' + err.code;
      });
  }

  onGoogleRegister(): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.firebaseAuth, provider)
      .then(() => {
        console.log('logged in with Google successfully');
      })
      .catch((err) => {
        this.errorMessage = 'Failed to login: ' + err.code;
      });
  }
}
