import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from "../book-card/book-card.component";
import { BookService } from '../../service/bookService/book.service';

@Component({
  selector: 'app-home',
  imports: [BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  recivedBook:any[]=[];
  
  constructor(private bookService:BookService) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    try{
      this.bookService.GetBooks().subscribe((res:any)=>{
        if(res.success && res.data){
          console.log(res.data);
          this.recivedBook=res.data.$values;
          console.log(this.recivedBook);
        }else{
          console.log(res.message);
        }
      })
    }catch(error){
      console.log(error);
    }
  }
}
