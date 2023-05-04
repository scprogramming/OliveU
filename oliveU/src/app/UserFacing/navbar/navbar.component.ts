import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router, private _authService:AuthService){}
  faSearch = faMagnifyingGlass;

  logout(){
    this._authService.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    })
  }
}
