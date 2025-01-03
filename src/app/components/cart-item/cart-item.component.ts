import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ShippingService } from '../../service/shippingService/shipping.service';
import { CartService } from '../../service/CartService/cart.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-item',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent  {
  @Input() cartItems:any;
  

  @Output() RemoveBook=new EventEmitter<number>();
  
  constructor(private _cartSerivce:CartService,private _snackBar:MatSnackBar) {
    
  }

  removeBook(id:number){
    this.RemoveBook.emit(id);
  }

  decress_quantity(book:any){
    if (book.quantity > 1) {
      const updatedQuantity = book.quantity - 1;
      this.updateBookQuantity(book.id, updatedQuantity);
    }
  }

  increse_quantity(book:any){
    const updatedQuantity = book.quantity + 1;
    this.updateBookQuantity(book.id, updatedQuantity);
  }
  
  private updateBookQuantity(bookId: number, quantity: number) {
    // First update UI optimistically
    const bookIndex = this.cartItems.findIndex((item: any) => item.id === bookId);
    if (bookIndex !== -1) {
      this.cartItems[bookIndex].quantity = quantity;
    }

    // Then make API call
    this._cartSerivce.updateCartItemQuantity(bookId, quantity).subscribe({
      next: (response:any) => {
        if(response.success){
          console.log("update cart",response);
          
          this._snackBar.open('Quantity updated successfully', 'Close', {
            duration: 3000
          });
        }
        else{
          console.log("update cart",response);
          this._snackBar.open('Quantity not updated', 'Close', {
            duration: 3000
          });
        }
        
      },
      error: (error) => {
        // Revert the optimistic update on error
        if (bookIndex !== -1) {
          this.cartItems[bookIndex].quantity = quantity - 1;
        }
        this._snackBar.open('Failed to update quantity', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
