import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { StatusOnlyRes } from 'src/app/Response';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-user-inputs6',
  templateUrl: './user-inputs6.component.html',
  styleUrls: ['./user-inputs6.component.css']
})
export class UserInputs6Component {
  isAuth:boolean;
  articleContent:any;

  constructor(private meta: Meta, private title:Title, private _authService:AuthService){
    this.meta.addTags([
      {name:'description', content:'In this article, you will learn how to take a user input using Python. You will also learn about the concept of type conversions.'},
      {name: 'author', content:'Scott Cosentino'},
      {name: 'keywords', content:'Python, Programming, Introduction to Programming'}
    ]);
    this.title.setTitle('Python User Inputs')
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