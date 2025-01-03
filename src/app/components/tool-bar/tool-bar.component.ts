import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BookCardComponent } from "../book-card/book-card.component";
import { HomeComponent } from "../home/home.component";
import { SearchService } from '../../service/SearchService/search.service';
import { Router } from '@angular/router';
import { CartService } from '../../service/CartService/cart.service';
import { Subscription } from 'rxjs';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { AuthService } from '../../service/authService/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { WishListComponent } from "../wish-list/wish-list.component";
import { DisplayWishListComponent } from "../display-wish-list/display-wish-list.component";
import { CommonModule } from '@angular/common';
import { DsiplayOrderComponent } from "../dsiplay-order/dsiplay-order.component";
import { OrderCompletedComponent } from "../order-completed/order-completed.component";
import { ProfileComponent } from "../profile/profile.component";
@Component({
  selector: 'app-tool-bar',
  imports: [MatCardModule, HomeComponent, MatMenuModule, MatButtonModule, DisplayWishListComponent, CommonModule, DsiplayOrderComponent, ProfileComponent],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent implements OnInit,OnDestroy{

  item_inside_cart=0;
  private cartSubscription!: Subscription;
  home_view=true;
  viewcart=false;
  viewProfile=false;

  userLoggeIn=false;

  displayWishList=false;
  displayOrderList=false;
  constructor(private router:Router,private _searchService:SearchService,private cartService:CartService,private _authService:AuthService){}

  ngOnInit(): void {
    this.isUserrLoggedin();
    this.cartSubscription = this.cartService.cartItemsCount$.subscribe(count => {
      this.item_inside_cart = count;
    });
  }
  
  closecart(){
    this.home_view=true;
    this.viewcart=false;
    this.displayWishList=false;
    this.displayOrderList=false;
    this.viewProfile=false;
    
  }
  
  isUserrLoggedin(){
    this.userLoggeIn=this._authService.isUserloggedIn();
  }
  openCart(){
    if(!this._authService.isUserloggedIn()){
      this.router.navigate(['login']);
      return;
    }

    this.home_view=false;
    this.viewcart=true;
    this.displayOrderList=false;
    this.viewProfile=false;
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  search(event:any){
    console.log(event.target.value)
    this._searchService.outgoingData(event.target.value)
  }

  Logout():void{
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  
  openWishlist(){
    this.displayOrderList=false;
    this.displayWishList=true;
    this.viewProfile=false;
  }

  logIn(){
    this.router.navigate(['login']);
      return;
  }

  openOrderlist(){
    this.displayWishList=false;
    this.displayOrderList=true;
    this.home_view=false;
    this.viewProfile=false;
  }

  enableProfile(){
    this.displayWishList=false;
    this.displayOrderList=false;
    this.home_view=false;
    this.viewProfile=true;
  }
}
