import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CourseDetails, EnrollRes, Lessons, StatusOnlyRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent {
  id:string;
  isAuth:boolean;
  courseContent:any;
  lessons:any;
  isEnrolled:boolean = false;

  constructor(private _authService:AuthService, private _apiservice:ApiRequestsService, private route: ActivatedRoute, private router:Router){}

  enrollStudent(){

    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;
      this._apiservice.postData('api/enroll/', {course_id:this.courseContent.details.id, token:token}).subscribe(res => {
        const enrollRes = <Response>res;
        if (enrollRes.status === 1){
          this.router.navigateByUrl('coursePlayer/' + this.id);
        }else{
          console.log("Failed to register!");
        }
        
      });
    }else{
      this.router.navigateByUrl('login');
    }
    

  }

  redirectToPlayer(){
    this.router.navigateByUrl('coursePlayer/' + this.id);
  }

  ngOnInit(){

    this.route.params.subscribe(params => {
      this._apiservice.getData('api/courseContent/' + params['id']).subscribe(res => {
        this.id = params['id'];
        let courseContent = <CourseDetails>res;

        if (localStorage.getItem("id_token") !== null){
          this._apiservice.postData('api/checkEnroll',{token:localStorage.getItem('id_token'),course_id:courseContent.details.id}).subscribe(res => {
            const enrollStatus = <EnrollRes>res;

            if (enrollStatus.status == 1){
                this.isEnrolled = enrollStatus.value;
                console.log(this.isEnrolled);            
            }
          })
        }

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
