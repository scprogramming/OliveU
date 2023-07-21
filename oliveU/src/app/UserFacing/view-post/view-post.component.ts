import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDetails, StatusOnlyRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {
  id:string;
  isAuth:boolean;
  articleContent:any;

  constructor(private _authService:AuthService, private _apiservice:ApiRequestsService, 
    private route: ActivatedRoute, private router:Router, private metaService: Meta){}

  ngOnInit(){

    this.route.params.subscribe(params => {
      this._apiservice.getData('api/articleContent/' + params['courseCode'] + "/" + params['id']).subscribe(res => {
        this.id = params['id'];
        let articleContent = <ArticleDetails>res;

        this.metaService.updateTag({name:'description', content:articleContent.description});
        this.articleContent = articleContent;
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
