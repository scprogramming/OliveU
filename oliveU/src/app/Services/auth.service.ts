import { Injectable } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _apiService:ApiRequestsService) { }

  register(email:string, password:string, confirmPassword:string){
    return this._apiService.postData('api/register', {email:email, password:password, confirmPassword:confirmPassword});
  }

  login(email:string, password:string){
    return this._apiService.postData('api/login', {email:email, password:password});
  }

  isAuthenticated(token:string){
    return this._apiService.postData('api/verifyToken', {token:token})
  }

  logout(){
    localStorage.removeItem('id_token');
  }
}
