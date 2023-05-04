import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import {AuthService} from '../Services/auth.service';
import { StatusOnlyRes } from '../Response';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    
      if (localStorage.getItem("id_token") !== null) {
        let token = localStorage.getItem("id_token")!;
        return this.authService.isAuthenticated(token).pipe(map((response:any) => {
          let parse = <StatusOnlyRes>response;
          return parse.status;
        }));
        
      }else{
        return false;
      }

  }
  
}