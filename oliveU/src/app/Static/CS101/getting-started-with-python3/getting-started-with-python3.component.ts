import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { StatusOnlyRes } from 'src/app/Response';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-getting-started-with-python3',
  templateUrl: './getting-started-with-python3.component.html',
  styleUrls: ['./getting-started-with-python3.component.css']
})
export class GettingStartedWithPython3Component {

  isAuth:boolean;
  articleContent:any;

  constructor(private meta: Meta, private title:Title, private _authService:AuthService){
    this.meta.addTags([
      {name:'description', content:'In this article, you will learn how to setup Python, run Python code, and setup the PyCharm IDE.'},
      {name: 'author', content:'Scott Cosentino'},
      {name: 'keywords', content:'Python, Programming, Introduction to Programming'}
    ]);
    this.title.setTitle('Getting Started with Python')
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
