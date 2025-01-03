import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '../htppService/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _http:HttpService) { }

  bookAdded=new EventEmitter<void>();
  bookRemoved=new EventEmitter<void>();
  bookList=new EventEmitter<void>();
      
  addBook(bookId:number){
    var reqdata={
      bookId:bookId
    }
    var url='https://localhost:7068/api/WishList';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    };

    return this._http.PostMethod(url,reqdata,true,httpOptions).pipe(
      tap((res:any)=>{
        if(res.success){
          this.bookAdded.emit();
          console.log("book added to  wish list");
        }
        else{
          console.log("book not added to  wish list");
        }
      })
    )
  }

  removeBook(bookId:number){
    var url="https://localhost:7068/api/WishList/item/"+bookId;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    };

    return this._http.deleteService(url,true,httpOptions).pipe(
      tap((res:any)=>{
        if(res.success){
          this.bookRemoved.emit();
          console.log("book removed from  wish list");
          console.log(res.message);
          
        }
        else{
          console.log("error occure while removing book");
          console.log(res.message);
        }
      })
    )
  }


  getWishList(){
    var url="https://localhost:7068/api/WishList";

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    };

    return this._http.getService(url,true,httpOptions).pipe(
      tap((res:any)=>{
        if(res.success){
          this.bookList.emit();
          console.log("book wish list");
          console.log(res.data);
          
        }
        else{
          console.log("error occure while removing book");
          console.log(res.message);
        }
      })
    );
  }
}
