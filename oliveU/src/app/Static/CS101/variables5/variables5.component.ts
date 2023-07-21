import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { StatusOnlyRes } from 'src/app/Response';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-variables5',
  templateUrl: './variables5.component.html',
  styleUrls: ['./variables5.component.css']
})
export class Variables5Component {
  isAuth:boolean;
  articleContent:any;

  constructor(private meta: Meta, private title:Title, private _authService:AuthService){
    this.meta.addTags([
      {name:'description', content:'In this article, you will learn what variables are and how they generally work in Python'},
      {name: 'author', content:'Scott Cosentino'},
      {name: 'keywords', content:'Python, Programming, Introduction to Programming'}
    ]);
    this.title.setTitle('Python Variables')
  }
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
