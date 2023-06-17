import { Component } from '@angular/core';
import { StatusOnlyRes } from 'src/app/Response';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-introduction-to-programming1',
  templateUrl: './introduction-to-programming1.component.html',
  styleUrls: ['./introduction-to-programming1.component.css']
})
export class IntroductionToProgramming1Component {

  isAuth:boolean;
  articleContent:any;

  constructor(private _authService:AuthService){}

  ngOnInit(){

    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;

      this._authService.isAuthenticated(token).subscribe(res => {
        let parse = <StatusOnlyRes>res;
        this.isAuth = parse.status;
      });
    }
  } 
}
