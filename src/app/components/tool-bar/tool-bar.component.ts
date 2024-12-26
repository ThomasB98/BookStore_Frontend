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

@Component({
  selector: 'app-tool-bar',
  imports: [MatCardModule, HomeComponent],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent implements OnInit,OnDestroy{

  item_inside_cart=0;
  private cartSubscription!: Subscription;
  home_view=true;
  viewcart=false;

  constructor(private router:Router,private _searchService:SearchService,private cartService:CartService,private _authService:AuthService){}


  


  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItemsCount$.subscribe(count => {
      this.item_inside_cart = count;
    });

  
  }

  
  closecart(){
    this.home_view=true;
    this.viewcart=false;
  }
  
  openCart(){
    if(!this._authService.isUserloggedIn()){
      this.router.navigate(['login']);
      return;
    }

    this.home_view=false;
    this.viewcart=true;
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
}
