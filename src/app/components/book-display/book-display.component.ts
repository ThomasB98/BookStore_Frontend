import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../service/CartService/cart.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarConfig,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WishlistService } from '../../service/wishlistService/wishlist.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-book-display',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './book-display.component.html',
  styleUrl: './book-display.component.css'
})
export class BookDisplayComponent implements OnInit {
  @Input() recivedbook:any;

  CartItems:any[]=[];
  userId:any;
  token:any;
  durationInSeconds=10;
  snapBarResponse="";
  constructor(private router:Router,private cartservice:CartService,
    private _snackBar:MatSnackBar,private _wishListService:WishlistService){

  }
  ngOnInit(): void {
     this.token=localStorage.getItem("token");
  }

  isTokenExpired(token:string):boolean{
    try{
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 
      return decoded.exp < currentTime;
    }
    catch (error) {
      console.error('Invalid token:', error);
      return true; // Treat invalid tokens as expired
    }
  }

  

  addToCart(book: any) {

    console.log("inside bookdisplay");
    
    console.log(book);
    
    console.log("outside bookdisplay");
    // Find if the item already exists in the cart
    const existingItemIndex = this.CartItems.findIndex((item: any) => item === book);
  
    if (existingItemIndex > -1) {
      // If the item already exists, increment its quantity
      this.CartItems[existingItemIndex].quantity += 1;
    } else {
      // Otherwise, add a new item with quantity = 1
      this.CartItems.push({ book: book, quantity: 1 });
    }
  
    // Store the updated CartItems array in localStorage
    localStorage.setItem("cartItems", JSON.stringify(this.CartItems));
  
    // If token is missing or expired, navigate to login
    if (!this.token || this.isTokenExpired(this.token)) {
      this.router.navigate(['login']);
      return;
    }
  
    // Create request data for backend API
    const reqData = {
      bookId: book.$id,
      quantity: 1,
    };
  
    // Make an API call to add the item to the cart
    try {
      this.cartservice.addToCart(reqData).subscribe(
        (res: any) => {
          if (res.success && res.data) {
            this.openSnackBar('Item added to cart', 'Close');
          } else {
            this.snapBarResponse = "Error occurred while adding item";
            this.openSnackBar('Error occurred while adding item', 'Close');
          }
        },
        (error: any) => {
          this.openSnackBar('An unexpected error occurred', 'Close');
        }
      );
  
      // Update cart count
      this.cartservice.updateCartCount();
    } catch (error) {
      console.error('Unexpected error:', error);
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


  addTOWishList(book:any){
    console.log(book);
    var bookId=book.id;
    console.log("bookId",bookId);
    
    try{
      this._wishListService.addBook(bookId).subscribe(
        (res:any)=>{
          if(res.success){
            console.log(res);
            this._snackBar.open("Book added to wishlistg", "close");
          }
          else{
            console.log(res);
            this._snackBar.open("error occure while addeding book to wishlistg", "close");
          }
        }
      );
    }catch(error){
      console.log(error);
      this._snackBar.open("error occure while addeding book to wishlistg", "close");
    }
  }

}
