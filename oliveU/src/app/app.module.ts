import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './UserFacing/home/home.component';
import { NavbarComponent } from './UserFacing/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { UnauthnavComponent } from './UserFacing/unauthnav/unauthnav.component';
import { LoginComponent } from './UserFacing/login/login.component';
import { RegisterComponent } from './UserFacing/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursePageComponent } from './UserFacing/course-page/course-page.component';
import { FooterComponent } from './UserFacing/footer/footer.component';
import { CoursePlayerComponent } from './UserFacing/course-player/course-player.component';
import { ProfileComponent } from './UserFacing/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UnauthnavComponent,
    LoginComponent,
    RegisterComponent,
    CoursePageComponent,
    FooterComponent,
    CoursePlayerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
