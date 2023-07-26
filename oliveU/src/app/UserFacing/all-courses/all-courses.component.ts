import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CourseRes, StatusOnlyRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {
  isAuth:boolean = false;
  courses:any;

  constructor(private _apiservice:ApiRequestsService, private _authService:AuthService, private titleService:Title){}

  ngOnInit(){
    this.titleService.setTitle("Courses");
    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;

      this._authService.isAuthenticated(token).subscribe(res => {
        let parse = <StatusOnlyRes>res;
        this.isAuth = parse.status;
      });
    }

    this._apiservice.getData('api/courses').subscribe(res => {
      const courseRes = <CourseRes>res;
      this.courses = courseRes.courses;
    })
    
    
  }
}
