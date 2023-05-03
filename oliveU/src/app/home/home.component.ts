import { Component } from '@angular/core';
import { ApiRequestsService } from '../api-requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private _apiservice:ApiRequestsService){}

  ngOnInit(){

  }
}
