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

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:"login", component:LoginComponent, canActivate:[LoginGuard]},
  {path:"register", component:RegisterComponent, canActivate:[LoginGuard]},
  {path:"courses/:id",component:CoursePageComponent},
  {path:"coursePlayer/:id",component:CoursePlayerComponent},
  {path:"profile", component:ProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
