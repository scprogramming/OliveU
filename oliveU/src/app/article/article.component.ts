import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApiRequestsService } from '../api-requests.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  path:string = "";
  article:any;

  constructor(private route: ActivatedRoute, private _apiservice:ApiRequestsService){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.path = params['path'];

      this._apiservice.getData('api/getArticle/' + this.path).subscribe(res => {
        this.article = res;
      })
    })
  }
}
