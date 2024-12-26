import { Component, OnInit,signal,ChangeDetectionStrategy } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ShippingService } from '../../service/shippingService/shipping.service';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { ToolBarComponent } from "../tool-bar/tool-bar.component";
import { AuthService } from '../../service/authService/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../service/CartService/cart.service';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-cart',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule,
     FormsModule, CartItemComponent,MatExpansionModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  readonly panelOpenState = signal(false);

  shippingAddress:any[]=[];
  cartItem:any[]=[];
  

  
  
  constructor(private _router:Router,private _shippingService:ShippingService,private _authService:AuthService,private _cartService:CartService) {

  }
  ngOnInit(): void {
      this.getAddress();
      this.getcartItems();
  }

  getAddress(){
    this._shippingService.getAddressByUserId().subscribe((res)=>{
      if(res.success){
        console.log(res);
        this.shippingAddress=res.data.$values;
        console.log(this.shippingAddress);
        
      }
      else{
        console.log(res);
      }
    });
  }

  getcartItems(){
    this._cartService.getItemCart().subscribe(
      (res)=>{
        if(res.success){
          console.log(res.message);
          
          console.log(res);
          this.cartItem=res.data.cartItems.$values;
          console.log(this.cartItem);
          
        }
        else{
          console.log(res);
        }
      }
    )
  }
}
