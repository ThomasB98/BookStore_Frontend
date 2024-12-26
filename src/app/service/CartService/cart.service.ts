import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '../htppService/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itemAdded = new EventEmitter<void>();

  getItem= new EventEmitter<void>();

  private cartItemsCount = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCount.asObservable();
  constructor(private http: HttpService) {
    this.updateCartCount();
  }

  addToCart(reqData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}` // Use Authorization header
      })
    };

    var url = "https://localhost:7068/api/Cart/add";
    return this.http.PostMethod(url, reqData, true, httpOptions).pipe(
      tap((res: any) => {
        if (res.success) {
          this.itemAdded.emit();
        }
      })
    );
  }


  updateCartCount() {
    const cartItems = localStorage.getItem("cartItems");
    console.log("Inside service updateCartCount");
    
    console.log(cartItems);
    

    if (cartItems) {
      try {
        const parsedItems = JSON.parse(cartItems);
        // Ensure $values exists and is an array
        if (Array.isArray(parsedItems.$values)) {
          const count = parsedItems.$values.length;
          console.log("Count of items:", count);
          this.cartItemsCount.next(count);
        } else {
          console.warn("Parsed items do not contain a valid $values array");
          this.cartItemsCount.next(0);
        }
      } catch (error) {
        console.error("Error parsing cart items:", error);
        this.cartItemsCount.next(0);
      }
    } else {
      this.cartItemsCount.next(0);
    }
    console.log("exiting service updateCartCount");
  }

  getItemCart(){
    var url="https://localhost:7068/api/Cart/user-cart";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}` // Use Authorization header
      })
    };

    return this.http.getService(url,true,httpOptions).pipe(
      tap((res: any) => {
        if (res.success) {
          this.getItem.emit();
        }
      })
    );
  }

}
