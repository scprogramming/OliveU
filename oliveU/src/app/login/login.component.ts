import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AuthResponse } from '../Response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form:FormGroup;
  message:string;

  constructor(private fb:FormBuilder, private _authService:AuthService, private router:Router){
    this.form = this.fb.group({
      email:[''],
      password:['']
    })
  }

  login(){
    const val = this.form.value;
    if (val.email && val.password){
     this._authService.login(val.email, val.password).subscribe((res) => {
        const parseRes = <AuthResponse>res;

        if (parseRes.status == 1){
          console.log(parseRes.token);
          this.router.navigateByUrl("/");
        }else{
          this.message = parseRes.message;
        }
        
        
     }) 
    }else{
      this.message = "All fields must be provided";
    }
  }
}
