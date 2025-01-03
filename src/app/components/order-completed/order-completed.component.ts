import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authService/auth.service';

@Component({
  selector: 'app-order-completed',
  imports: [],
  templateUrl: './order-completed.component.html',
  styleUrl: './order-completed.component.css'
})
export class OrderCompletedComponent implements OnInit {

  constructor(private _router:Router,private _authService:AuthService){

  }
  ngOnInit(): void {
    if(!this._authService.isUserloggedIn()){
      this._router.navigate(['']);
    }
  }

  
  redirect(){
    this._router.navigate(['']);
  }
}
