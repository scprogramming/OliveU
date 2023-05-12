import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusOnlyRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent {
  isAuth:boolean;

  constructor(private _authService:AuthService, private _apiservice:ApiRequestsService, private route: ActivatedRoute){}

  ngOnInit(){

    this.route.params.subscribe(params => {
      console.log('api/courseContent/' + params['id']);
      this._apiservice.getData('api/courseContent/' + params['id']).subscribe(res => {
        console.log(res);
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
