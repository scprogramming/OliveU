import { Component, HostListener } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { CourseDetails, Lessons, StatusOnlyRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.css']
})
export class CoursePlayerComponent {

  constructor(public sanitizer:DomSanitizer, private _authService:AuthService, private _apiservice:ApiRequestsService, private route: ActivatedRoute, private router:Router,
    private titleService:Title){}
  lessons:any;
  courseContent:any;
  activeContent:any;
  activeSelectMod:any = 1;
  activeSelectLesson:any = 0;
  activeTitle:any;
  lastLesson:boolean;
  linearLessonList:any;
  
  changeContent(lesson_id:any){
    this.activeContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.linearLessonList[lesson_id].content);
    
    this.activeSelectLesson = lesson_id;

    if (this.activeSelectLesson < this.linearLessonList.length - 1){
      this.lastLesson = false;
    }else{
      this.lastLesson = true;
    }
    this.activeSelectMod = this.linearLessonList[lesson_id].module_id;
    this.activeTitle = this.linearLessonList[lesson_id].title;
  }


  nextLesson(){
      this.activeSelectLesson += 1;

      if (this.activeSelectLesson + 1 > this.linearLessonList.length - 1){
        this.lastLesson = true;
      }

      this.activeTitle = this.linearLessonList[this.activeSelectLesson].title;
      this.activeSelectMod = this.linearLessonList[this.activeSelectLesson].module_id;
      this.activeContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.linearLessonList[this.activeSelectLesson].content);
  }

  ngOnInit(){

    this.activeContent = this.sanitizer.bypassSecurityTrustResourceUrl("");
    this.route.params.subscribe(params => {
      this._apiservice.getData('api/courseContent/' + params['id']).subscribe(res => {
        let courseContent = <CourseDetails>res;

        let organizedLesson:any = [];
        let linearLessons:any = [];

        let i = 0;
        while (i < courseContent.lessons.length){
          linearLessons.push(courseContent.lessons[i]);

          if (organizedLesson[courseContent.lessons[i].module_id] === undefined){
            organizedLesson[courseContent.lessons[i].module_id] = [{linearId:i,lessons:courseContent.lessons[i]}];
          }else{
            organizedLesson[courseContent.lessons[i].module_id].push({linearId:i,lessons:courseContent.lessons[i]});
          }

          i += 1;
        }

        this.courseContent = courseContent; 
        this.lessons = <Lessons>organizedLesson;
        this.activeTitle = this.lessons[1][0].lessons.title;
        this.activeContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.lessons[1][0].lessons.content);
        this.linearLessonList = <Lessons>linearLessons;

        this.titleService.setTitle(this.activeTitle);
        console.log(this.linearLessonList)
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
