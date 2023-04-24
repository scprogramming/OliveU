import { Component } from '@angular/core';
import { ApiRequestsService } from '../api-requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  articles:any
  constructor(private _apiservice:ApiRequestsService){}

  ngOnInit(){
    this._apiservice.getData("api/articles").subscribe(res => {
      console.log(res);
      this.articles = res;
    })
  }
}
