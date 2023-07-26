import { Component } from '@angular/core';
import { Meta,Title } from '@angular/platform-browser';
import { StatusOnlyRes } from 'src/app/Response';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-introduction-to-programming1',
  templateUrl: './introduction-to-programming1.component.html',
  styleUrls: ['./introduction-to-programming1.component.css']
})
export class IntroductionToProgramming1Component {

  isAuth:boolean;
  articleContent:any;

  constructor(private meta: Meta, private title:Title, private _authService:AuthService){
    this.meta.addTags([
      {name:'description', content:'In this article, you will learn the fundamentals of programming, as well how CPU, RAM, and secondary storage interact with programs'},
      {name: 'author', content:'Scott Cosentino'},
      {name: 'keywords', content:'Python, Programming, Introduction to Programming'}
    ]);
    this.title.setTitle('Introduction to Programming')
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
