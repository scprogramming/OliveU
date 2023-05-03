import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
     this._authService.register(val.email, val.password, val.confirmPassword).subscribe(() => {
        console.log("Registered!");
        this.router.navigateByUrl("/");
     }) 
    }else{
      this.message = "All fields must be provided";
    }
  }

}
