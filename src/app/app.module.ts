import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { UserRoleDirective } from './directives/user-role.directive';
import { UserDirective } from './directives/user.directive';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './app/footer/footer.component';
import { HeaderComponent } from './app/header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FirebaseOptions } from '@angular/fire/app';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ProfileComponent,
		NotFoundComponent,
		LoginComponent,
		UserDirective,
		UserRoleDirective,
		FooterComponent,
		HeaderComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase as FirebaseOptions),
	],
	exports: [UserDirective, UserRoleDirective],
	providers: [AuthService, CommonModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
