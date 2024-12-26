import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BookCardComponent } from "../book-card/book-card.component";
import { BookService } from '../../service/bookService/book.service';
import { BookDisplayComponent } from "../book-display/book-display.component";
import { CommonModule } from '@angular/common';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-home',
  imports: [BookDisplayComponent, BookCardComponent, CommonModule, CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  @Input() viewCart=false;

  recivedBook:any[]=[];

  Book:any;
  displayHome=true;
  displatBook=false;
  
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

  displayBook(book:any){
    console.log("Selected book:", book);
    this.Book=book;
    this.displayHome=false;
    this.displatBook=true;
  }
}
