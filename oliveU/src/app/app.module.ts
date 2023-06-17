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
import { UserCoursesComponent } from './UserFacing/user-courses/user-courses.component';
import { AllCoursesComponent } from './UserFacing/all-courses/all-courses.component';
import { AllPostsComponent } from './UserFacing/all-posts/all-posts.component';
import { ViewPostComponent } from './UserFacing/view-post/view-post.component';
import { IntroductionToProgramming1Component } from './Static/CS101/introduction-to-programming1/introduction-to-programming1.component';
import { HowComputersStoreData1Component } from './Static/CS101/how-computers-store-data1/how-computers-store-data1.component';
import { GettingStartedWithPython3Component } from './Static/CS101/getting-started-with-python3/getting-started-with-python3.component';
import { PrismComponent } from './prism.component';

import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-scss';
import { OutputsStringsComments4Component } from './Static/CS101/outputs-strings-comments4/outputs-strings-comments4.component';

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
    ProfileComponent,
    UserCoursesComponent,
    AllCoursesComponent,
    AllPostsComponent,
    ViewPostComponent,
    IntroductionToProgramming1Component,
    HowComputersStoreData1Component,
    GettingStartedWithPython3Component,
    PrismComponent,
    OutputsStringsComments4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
