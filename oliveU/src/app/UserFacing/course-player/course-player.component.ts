import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDetails, Lessons, StatusOnlyRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.css']
})
export class CoursePlayerComponent {

  constructor(public sanitizer:DomSanitizer, private _authService:AuthService, private _apiservice:ApiRequestsService, private route: ActivatedRoute, private router:Router){}
  lessons:any;
  courseContent:any;
  activeContent:any;
  activeSelectMod:any = 1;
  activeSelectLesson:any = 1;
  activeTitle:any;
  
  changeContent(module_id:any,lesson_id:any){
    this.activeContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.lessons[module_id][lesson_id-1].content);
    this.activeSelectMod = module_id;
    this.activeSelectLesson = lesson_id;
    this.activeTitle = this.lessons[module_id][lesson_id-1].title;
  }

  ngOnInit(){

    this.activeContent = this.sanitizer.bypassSecurityTrustResourceUrl("");
    this.route.params.subscribe(params => {
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
        this.activeTitle = this.lessons[1][0].title;
        this.activeContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.lessons[1][0].content);

        console.log(this.lessons)
      })
    })

    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;

      this._authService.isAuthenticated(token).subscribe(res => {
        let parse = <StatusOnlyRes>res;
      });
    }
    
    
  }

}
