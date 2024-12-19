import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SearchPipe } from "../../pipe/searchpipe/search.pipe";
import { SearchService } from '../../service/SearchService/search.service';
@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, SearchPipe],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit {
  @Input() bookArray:any[]=[];


  filterBook:any;

  constructor(private _SearchService:SearchService) {
  }
  ngOnInit(): void {
    this._SearchService.IncomingMessage.subscribe((response)=>{
      console.log("Search in process");
      this.filterBook =response;
    })
  }
}
