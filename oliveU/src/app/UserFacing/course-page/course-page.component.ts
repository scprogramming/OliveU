import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDetails, Lessons, StatusOnlyRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent {
  isAuth:boolean;
  courseContent:any;
  lessons:any;

  constructor(private _authService:AuthService, private _apiservice:ApiRequestsService, private route: ActivatedRoute){}

  ngOnInit(){

    this.route.params.subscribe(params => {
      console.log('api/courseContent/' + params['id']);
      this._apiservice.getData('api/courseContent/' + params['id']).subscribe(res => {
        let courseContent = <CourseDetails>res;

        let organizedLesson:any = [];
        let i = 0;
        while (i < courseContent.lessons.length){

          if (organizedLesson[courseContent.lessons[i].module_id] === undefined){
            organizedLesson[courseContent.lessons[i].module_id] = [courseContent.lessons[i]];
          }else{
            organizedLesson[courseContent.lessons[i].module_id].push(courseContent.lessons[i]);
          }

          i += 1;
        }

        this.courseContent = courseContent;
        this.lessons = <Lessons>organizedLesson;

        console.log(this.lessons)
      })
    })

    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;

      this._authService.isAuthenticated(token).subscribe(res => {
        let parse = <StatusOnlyRes>res;
        this.isAuth = parse.status;
      });
    }
    
    
  }
}
