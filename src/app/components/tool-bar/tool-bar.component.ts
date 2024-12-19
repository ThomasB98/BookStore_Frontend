import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BookCardComponent } from "../book-card/book-card.component";
import { HomeComponent } from "../home/home.component";
import { SearchService } from '../../service/SearchService/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  imports: [MatCardModule, HomeComponent],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
  constructor(private router:Router,private _searchService:SearchService){}


  search(event:any){
    console.log(event.target.value)
    this._searchService.outgoingData(event.target.value)
  }
}
