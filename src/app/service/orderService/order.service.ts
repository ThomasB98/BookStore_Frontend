import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '../htppService/http.service';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderPlace=new EventEmitter<void>();
  getOrder=new EventEmitter<void>();
  constructor(private _http: HttpService) { }

  placeOrder(shippingId: number) {
    const url = "https://localhost:7068/api/Order";
    var reqdata={
      shippindId:shippingId
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    };

    return this._http.PostMethod(url,reqdata, true,httpOptions).pipe(
      tap({
        next: (res: any) => {
          if (res.success) {
            this.orderPlace.emit();
          } else {
            console.error("API error", res.message || "Unknown error");
          }
        },
        error: (err) => {
          console.error("HTTP error occurred", err);
        }
      })
    );
  }

  getOrders(){
    const url = "https://localhost:7068/api/Order/user-orders";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    };

    return this._http.getService(url,true,httpOptions).pipe(
      tap(
        (res: any) => {
          if (res.success) {
            this.getOrder.emit();
          } else {
            console.error("API error", res.message || "Unknown error");
          }
        }
      )
    );
  }
  
}
