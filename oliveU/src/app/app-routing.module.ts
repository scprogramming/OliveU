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
import { IntroductionToProgramming1Component } from './Static/CS101/introduction-to-programming1/introduction-to-programming1.component';
import { HowComputersStoreData1Component } from './Static/CS101/how-computers-store-data1/how-computers-store-data1.component';
import { GettingStartedWithPython3Component } from './Static/CS101/getting-started-with-python3/getting-started-with-python3.component';
import { OutputsStringsComments4Component } from './Static/CS101/outputs-strings-comments4/outputs-strings-comments4.component';
import { Variables5Component } from './Static/CS101/variables5/variables5.component';
import { UserInputs6Component } from './Static/CS101/user-inputs6/user-inputs6.component';

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
  {path:"posts", component:AllPostsComponent},
  {path:"tutorials/CS101/introduction-to-programming", component:IntroductionToProgramming1Component},
  {path:"tutorials/CS101/how-computers-store-data", component:HowComputersStoreData1Component},
  {path:"tutorials/CS101/getting-started-with-python", component:GettingStartedWithPython3Component},
  {path:"tutorials/CS101/outputs-strings-comments", component:OutputsStringsComments4Component},
  {path:"tutorials/CS101/variables", component:Variables5Component},
  {path:"tutorials/CS101/user-inputs", component:UserInputs6Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
