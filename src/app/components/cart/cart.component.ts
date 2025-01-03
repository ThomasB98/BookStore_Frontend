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
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { OrderService } from '../../service/orderService/order.service';
import { OrderCompletedComponent } from "../order-completed/order-completed.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule,
    FormsModule, CartItemComponent, MatExpansionModule,
    CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  readonly panelOpenState = signal(false);

  shippingAddress:any[]=[];
  cartItem:any[]=[];

  addressId:number=0;
  selectedAddress:any;
  customerDeatil:any;
  display_complete=false;
  durationInSeconds=10;
  snapBarResponse="";

  fName="";
  lname="";
  addresslane1="";
  addresslane2="";
  city="";
  state="";
  pincode="";

  
  
  constructor(private _router:Router,private _shippingService:ShippingService,
    private _authService:AuthService,private _cartService:CartService,
    private _snackBar:MatSnackBar,private _orderService:OrderService) {

  }
  ngOnInit(): void {
      this.getAddress();
      this.getcartItems();
      this.getUserRole();
  }

  getUserRole(){
    var role=this._authService.getUserRole();
    console.log("role",role);
    
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
          console.log("inside cart getcartItems Method");
          
          console.log(res);
          this.cartItem=res.data.cartItems.$values;
          console.log(this.cartItem);

          console.log("outside cart getcartItems Method");
          
        }
        else{
          console.log(res);
        }
      }
    )
  }

  onAddressSelected(data:any){
    const selectedAddress = this.shippingAddress.find(
      (address) => address.$id === this.selectedAddress
    );
    console.log('Selected Address:', selectedAddress);


    this.customerDeatil=this.selectedAddress;

    this.addresslane1=selectedAddress.addressLine1;
    this.addresslane2=selectedAddress.addressLine2;
    this.city=selectedAddress.city;
    this.state=selectedAddress.state;
    this.pincode=selectedAddress.postalCode;

    this.addressId=selectedAddress.shippingId;
    

  }


  removeBookFromCart(id:any){
    try{
          this._cartService.removeItemcart(id).subscribe((res)=>{
            if(res.success){
              this.openSnackBar('Book removed', 'Close');
              this.getcartItems();
            }
          });
        }catch(error){
          this.openSnackBar('Book not removed', 'Close');
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

  PlaceOrder(){
    if(this.cartItem.length<0){
      this.openSnackBar('cart is empty','close');
      return;
    }
    try{
      this._orderService.placeOrder(this.addressId).subscribe(
        (res:any)=>{
          if(res.success){
            this._snackBar.open("order placed", "closed");
            console.log(res);
            this._router.navigate(['success']);
          } 
          else{
            this._snackBar.open("order not placed", "closed");
            console.log(res);
            
          }
        }
      );
    } catch(error){
      this._snackBar.open("order not placed", "closed");
      console.log(error);
      
    }
  }

  AddAddress(){
    var redata={
      addressLine1:this.addresslane1,
      addressLine2:this.addresslane2,
      city:this.city,
      state:this.state,
      postalCode:this.pincode,
      userId:this._authService.getUserId(),
      orderId:0
    }

    try{
      this._shippingService.addNewAddress(redata).subscribe(
        (res:any)=>{
          if(res.success){
            console.log("Address added");
            this.openSnackBar(res.message,"close");
            this.getAddress();
          }
          else{
            console.log("Address not added");
            this.openSnackBar(res.message,"close");
          }
        }
      );
    }catch(erro){
      console.log(erro);
      this.openSnackBar("Address not added","close");
    }
    
  }
}
