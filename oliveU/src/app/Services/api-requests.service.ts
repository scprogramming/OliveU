import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {
  apiUrl = "https://149.248.53.207:5000/";

  constructor(private _http:HttpClient) { }

  getData(endpoint:string){
    return this._http.get(this.apiUrl + endpoint)
  }

  postData(endpoint:string,reqBody:any){

    const body = JSON.stringify(reqBody);
    return this._http.post(this.apiUrl + endpoint,body, {'headers':{'content-type':'application/json'}})
  }

  postFormData(endpoint:string, formData:FormData){
    return this._http.post(this.apiUrl + endpoint, formData);
  }

}
