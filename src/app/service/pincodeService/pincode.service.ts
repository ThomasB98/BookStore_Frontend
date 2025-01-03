import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '../htppService/http.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PincodeService {
  getAdd=new EventEmitter<void>();

  constructor(private http:HttpService) { }

  getAddressBypincode(pincode:number){
    return this.http.getService("https://api.postalpincode.in/pincode/"+pincode,false).pipe(
      tap(
        (res:any)=>{
          if (res.success) {
            this.getAdd.emit();
          }
        }
      )
    );
  }
}
