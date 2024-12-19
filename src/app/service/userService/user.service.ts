import { Injectable } from '@angular/core';
import { HttpService } from '../htppService/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService) { }

  LogIn(reqData:any){
    let header={
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    }

    return this.http.PostMethod("https://localhost:7068/api/User/login",reqData,false,{header});
  }

  Registertion(reqData:any){
    let header={
      Headers:new HttpHeaders({
        "content-type":"application/json"
      })
    }

    return this.http.PostMethod("https://localhost:7068/api/User/register",reqData,false,{header});
  }
}
