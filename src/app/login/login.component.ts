import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../service/auth.service';
import { CommonService } from '../service/common.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  HOME_ROUTE,
  REGISTER_ROUTE,
  ROOT_ROUTE,
} from '../service/data/all-routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginComponent implements OnInit {
  isDevelopment = !environment.production;
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  cs = inject(CommonService);

  loginForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  REGISTER_ROUTE: string = REGISTER_ROUTE;
  ROOT_ROUTE = ROOT_ROUTE;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.isDevelopment) {
      this.loginForm.setValue({
        email: 'test1@gmail.com',
        password: 'Test1Pass',
      });
    }
  }

  onLogin(): void {
    console.log('login action performed');
    const rawForm = this.loginForm.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        console.log('logged in successfully');
      },
      error: (err) => {
        this.errorMessage = 'Failed to login: ' + err.code;
      },
    });
  }

  onGoogleLogin(): void {
    this.authService.registerOrLoginWithGoogle(true).subscribe({
      next: () => {
        console.log('logged in successfully');
      },
      error: (err) => {
        this.errorMessage = 'Failed to login: ' + err.code;
      },
    });
  }
}
