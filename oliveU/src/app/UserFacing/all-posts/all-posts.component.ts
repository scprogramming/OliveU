import { Component } from '@angular/core';
import { ArticleRes, CourseRes, StatusOnlyRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {
  isAuth:boolean = false;
  articles:any;

  constructor(private _apiservice:ApiRequestsService, private _authService:AuthService){}

  ngOnInit(){

    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;

      this._authService.isAuthenticated(token).subscribe(res => {
        let parse = <StatusOnlyRes>res;
        this.isAuth = parse.status;
      });
    }

    this._apiservice.getData('api/articles').subscribe(res => {
      const articleRes = <ArticleRes>res;
      this.articles = articleRes.articles;
    })
    
    
  }
}
