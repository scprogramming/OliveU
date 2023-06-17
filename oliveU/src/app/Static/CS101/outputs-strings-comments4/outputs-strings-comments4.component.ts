import { Component } from '@angular/core';
import { StatusOnlyRes } from 'src/app/Response';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-outputs-strings-comments4',
  templateUrl: './outputs-strings-comments4.component.html',
  styleUrls: ['./outputs-strings-comments4.component.css']
})
export class OutputsStringsComments4Component {
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
