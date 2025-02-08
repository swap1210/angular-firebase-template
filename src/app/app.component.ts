import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AuthService } from './service/auth.service';
import { environment } from '../environments/environment';
import { MatRippleModule } from '@angular/material/core';
import { LOGIN_ROUTE, REGISTER_ROUTE } from './service/data/all-routes';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = environment.AppTitle;
  showFiller = false;

  toggleSideNav = () => {
    this.showFiller = !this.showFiller;
  };
  authService = inject(AuthService);
  LOGIN_ROUTE: string = LOGIN_ROUTE;
  REGISTER_ROUTE: string = REGISTER_ROUTE;

  ngOnInit(): void {}
}
