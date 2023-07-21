import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { StatusOnlyRes } from 'src/app/Response';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-how-computers-store-data1',
  templateUrl: './how-computers-store-data1.component.html',
  styleUrls: ['./how-computers-store-data1.component.css']
})
export class HowComputersStoreData1Component {

  isAuth:boolean;
  articleContent:any;

  constructor(private meta: Meta, private title:Title, private _authService:AuthService){
    this.meta.addTags([
      {name:'description', content:'In this article, you will learn the basics of how computers store data. This article introduces binary numbers and ASCII encoding.'},
      {name: 'author', content:'Scott Cosentino'},
      {name: 'keywords', content:'Python, Programming, Introduction to Programming'}
    ]);
    this.title.setTitle('How Computers Store Data')
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
