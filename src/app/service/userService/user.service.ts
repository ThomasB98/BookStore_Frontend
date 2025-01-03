import { Injectable } from '@angular/core';
import { HttpService } from '../htppService/http.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService,private _authService:AuthService) { }

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

  getUserDetails(){
    var userId=this._authService.getUserId();
    var url="https://localhost:7068/api/User/"+userId;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    };

    return this.http.getService(url,true,httpOptions);
  }
}
