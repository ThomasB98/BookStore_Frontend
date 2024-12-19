import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private messageSource=new BehaviorSubject([]);
  IncomingMessage=this.messageSource.asObservable();


  outgoingData(message:any){
    console.log(message);
    this.messageSource.next(message);
  }
}
