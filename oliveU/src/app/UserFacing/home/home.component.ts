import { Component } from '@angular/core';
import { ApiRequestsService } from '../../Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';
import { StatusOnlyRes } from 'src/app/Response';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAuth:boolean = false;

  constructor(private _apiservice:ApiRequestsService, private _authService:AuthService){}

  ngOnInit(){

    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;

      this._authService.isAuthenticated(token).subscribe(res => {
        let parse = <StatusOnlyRes>res;
        this.isAuth = parse.status;
        console.log(this.isAuth);
      });
    }
    
    
  }
}
