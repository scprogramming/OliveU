import { Component } from '@angular/core';
import { CourseRes, StatusOnlyRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent {
  courses:any;

  constructor(private _apiservice:ApiRequestsService, private _authService:AuthService){}

  ngOnInit(){

    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;
      this._apiservice.postData('api/userCourses', {token:token}).subscribe(res => {
        const courseRes = <CourseRes>res;
        this.courses = courseRes.courses;
      })
    }  
  }
}
