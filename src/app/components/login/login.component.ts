import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../../service/userService/user.service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MatCardModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private userService:UserService,private router: Router){}

  userEmail="";
  userName="";
  userPassword="";
  address="";
  isLoginActive = true;

  toggleActive(state: boolean): void {
    this.isLoginActive = state;
  }

  LogIn():void{
    if(this.userEmail.length>0 && this.userPassword.length>0){

      const reData = {
        email: this.userEmail,
        password: this.userPassword
      };

      this.userService.LogIn(reData).subscribe((res:any)=>{
        if(res.success && res.data){
          try{
            const jwtToken = res.data; // Extract the token
            console.log('JWT Token:', jwtToken);

            const decodedToken: any = jwtDecode(jwtToken);
            console.log('Decoded Token:', decodedToken);

            const userId = decodedToken.sub || '';
            const username = decodedToken.name || '';

            localStorage.setItem("username", username);
            localStorage.setItem("userId", userId);
            localStorage.setItem("token", jwtToken);
          }
          catch(error){
            console.error('Invalid Token', error);
          }
        }  else{
          console.error('Login failed:', res.message);
        }
      },
      (error)=>{
        console.error('Error during login:', error);
      });
    }
    else{
      console.log('Form is invalid');
    }
  }



  Register():void{
    if(this.userEmail.length>0 && this.userPassword.length>0 && this.address.length>0 && this.userName.length>0){
      const reData = {
        name:this.userName,
        email: this.userEmail,
        password: this.userPassword,
        confirmPassword: this.userPassword,
        address: this.address
      };

      this.userService.Registertion(reData).subscribe((res:any)=>{
        if(res.success && res.data){
          try{
            this.isLoginActive=true;
            this.userName="";
            this.userEmail="";
            this.userPassword="";
            this.userPassword="";
            this.address="";
            alert("registration successfull");
          }catch(error){
            alert("registration Unsuccessfull");
            console.log(error);
          }
        }
      },(error)=>{
        alert("registration Unsuccessfull");
        console.error('Error during login:', error);
      });
    }else{
      console.log('Form invalid')
    }
  }

}
