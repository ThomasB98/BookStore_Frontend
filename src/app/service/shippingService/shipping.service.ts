import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '../htppService/http.service';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  userAddressList = new EventEmitter<void>();
  constructor(private http: HttpService) { }

  getAddressByUserId() {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    };


    var url = "https://localhost:7068/api/Shipping/user-addresses";
    return this.http.getService(url, true, httpOptions).pipe(
      tap((res: any) => {
        if (res.success) {
          this.userAddressList.emit();
        }
      })
    )

  }
}
