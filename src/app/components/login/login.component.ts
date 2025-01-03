import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../../service/userService/user.service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [MatCardModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private userService:UserService,private router: Router,private _snackBar:MatSnackBar){}

  userEmail="";
  userName="";
  userPassword="";
  address="";
  isLoginActive = true;
  durationInSeconds=5;
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

            this.router.navigate(['']);
          }
          catch(error){
            console.error('Invalid Token', error);
            this.openSnackBar("email or password Incorrect","close");
          }
        }  else{
          console.error('Login failed:', res.message);
          this.openSnackBar("email or password Incorrect","close");
        }
      },
      (error)=>{
        console.error('Error during login:', error);
        this.openSnackBar("email or password Incorrect","close");
      });
    }
    else{
      console.log('Form is invalid');
      this.openSnackBar("email and password can not br empty","close");
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


    openSnackBar(message: string, action: string) {
        const config: MatSnackBarConfig = {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar']
        };
    
        this._snackBar.open(message, action, config);
      }

}
