import { Component } from '@angular/core';
import { StatusMessageRes, StatusOnlyRes, UserDetailRes } from 'src/app/Response';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  isAuth:boolean;
  profileActive:boolean=true;
  passwordActive:boolean=false;
  user_id:any;
  first_name:any;
  last_name:any;
  country:any;
  email:any;
  status:any;

  currentPassword:any;
  newPassword:any;
  confirmPassword:any;

  constructor(private _apiservice:ApiRequestsService, private _authService:AuthService){}

  changeActive(mode:number){
    if (mode === 0){
      this.profileActive = true;
      this.passwordActive = false;
    }else{
      this.profileActive = false;
      this.passwordActive = true;
    }
  }

  updatePassword(){
    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;
      this._apiservice.postData("api/updatePassword", {token:token,old_password:this.currentPassword, new_password:this.newPassword, confirm_password:this.confirmPassword}).subscribe(res => {
        const parseRes = <StatusMessageRes>res;
        this.status = parseRes.message;
      });
    }
  }

  saveProfile(){
    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;
      this._apiservice.postData("api/updateUserDetails", {token:token,email:this.email, first_name:this.first_name, last_name:this.last_name, country:this.country}).subscribe(res => {
        const parseRes = <StatusMessageRes>res;
        this.status = parseRes.message;
      });
    }
  }

  ngOnInit(){

    if (localStorage.getItem("id_token") !== null){
      const token = localStorage.getItem('id_token')!;

      this._authService.isAuthenticated(token).subscribe(res => {
        let parse = <StatusOnlyRes>res;
        this.isAuth = parse.status;

        if (this.isAuth){
          this._apiservice.postData('api/userDetails',{token:token}).subscribe(res => {
            let parse = <UserDetailRes>res;

            this.email = parse.email;
            this.user_id = parse.user_id;

            if (parse.user_details === undefined){
              this.first_name ="";
              this.last_name = "";
              this.country = "";
              
            }else{
              
              this.first_name =parse.user_details.first_name;
              this.last_name = parse.user_details.last_name;
              this.country = parse.user_details.country;
            }
            
          });
        }
      });
    }

    
    
    
  }
}
