import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StatusOnlyRes } from '../Response';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    
      if (localStorage.getItem("id_token") !== null) {
        let token = localStorage.getItem("id_token")!;
        return this.authService.isAuthenticated(token).pipe(map((response:any) => {
          let parse = <StatusOnlyRes>response;

          if (parse.status){
            this.router.navigate(['..']);
            return false;
          }

          localStorage.removeItem('id_token');
          return true;
        }));
        
      }else{
        return true;
      }

  }
}
