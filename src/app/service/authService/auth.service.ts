import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  private getToken(): string | null {
    return localStorage.getItem("token");
  }

  isTokenExpired(token:string):boolean{
    try{
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 
      console.log("reutrning false");
      
      return decoded.exp < currentTime;
    }
    catch (error) {
      console.error('Invalid token:', error);
      return true; // Treat invalid tokens as expired
    }
  }

  isUserloggedIn():boolean{
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  getUserId(){
    return localStorage.getItem("userId");
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
