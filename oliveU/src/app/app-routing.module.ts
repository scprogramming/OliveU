import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './UserFacing/home/home.component';
import { LoginComponent } from './UserFacing/login/login.component';
import { RegisterComponent } from './UserFacing/register/register.component';
import { LoginGuard } from './Guards/login.guard';
import { CoursePageComponent } from './UserFacing/course-page/course-page.component';
import { CoursePlayerComponent } from './UserFacing/course-player/course-player.component';
import { ProfileComponent } from './UserFacing/profile/profile.component';
import { AuthGuard } from './Guards/auth.guard';
import { UserCoursesComponent } from './UserFacing/user-courses/user-courses.component';
import { AllCoursesComponent } from './UserFacing/all-courses/all-courses.component';
import { AllPostsComponent } from './UserFacing/all-posts/all-posts.component';
import { ViewPostComponent } from './UserFacing/view-post/view-post.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'courses', component:AllCoursesComponent},
  {path:"login", component:LoginComponent, canActivate:[LoginGuard]},
  {path:"register", component:RegisterComponent, canActivate:[LoginGuard]},
  {path:"courses/:id",component:CoursePageComponent},
  {path:"coursePlayer/:id",component:CoursePlayerComponent},
  {path:"profile", component:ProfileComponent, canActivate:[AuthGuard]},
  {path:"userCourses", component:UserCoursesComponent, canActivate:[AuthGuard]},
  {path:"posts/:courseCode/:id", component:ViewPostComponent},
  {path:"posts", component:AllPostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
