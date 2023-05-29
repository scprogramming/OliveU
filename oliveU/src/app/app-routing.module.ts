import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './UserFacing/home/home.component';
import { LoginComponent } from './UserFacing/login/login.component';
import { RegisterComponent } from './UserFacing/register/register.component';
import { LoginGuard } from './Guards/login.guard';
import { CoursePageComponent } from './UserFacing/course-page/course-page.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:"login", component:LoginComponent, canActivate:[LoginGuard]},
  {path:"register", component:RegisterComponent, canActivate:[LoginGuard]},
  {path:"courses/:id",component:CoursePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
