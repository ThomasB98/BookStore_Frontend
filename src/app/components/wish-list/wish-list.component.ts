import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  imports: [CommonModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent{
 
  @Input() wishlist:any;
  @Input() length:any;

  @Output() remove_Item =new EventEmitter<any>();

  removeItem(item:any){
    this.remove_Item.emit(item);
  }
}
