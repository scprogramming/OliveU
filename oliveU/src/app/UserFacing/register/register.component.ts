import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/Response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form:FormGroup;
  message:string;

  constructor(private fb:FormBuilder, private _authService:AuthService, private router:Router){
    this.form = this.fb.group({
      email:[''],
      password:[''],
      confirmPassword:['']
    })
  }

  

  register(){
    const val = this.form.value;
    if (val.email && val.password && val.confirmPassword){
     this._authService.register(val.email, val.password, val.confirmPassword).subscribe((res) => {
        const parseRes = <AuthResponse>res;

        if (parseRes.status === 1){
          this._authService.login(val.email, val.password).subscribe((loginRes) => {
            const loginParse = <AuthResponse>loginRes;

            if (loginParse.status === 1){
              localStorage.setItem('id_token', loginParse.token);
              this.router.navigateByUrl("/");
            }else{
              this.message = loginParse.message;
            }
          });
        }else{
          this.message = parseRes.message;
        }
     }); 
    }else{
      this.message = "All fields must be provided";
    }
  }

}
