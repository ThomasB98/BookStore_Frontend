import { Injectable } from '@angular/core';
import { HttpService } from '../htppService/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpService) { }

  GetBooks(){
    return this.http.getService("https://localhost:7068/api/Book",false);
  }
}
