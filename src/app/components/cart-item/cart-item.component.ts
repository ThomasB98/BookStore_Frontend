import { Component, Input } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ShippingService } from '../../service/shippingService/shipping.service';

@Component({
  selector: 'app-cart-item',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartItems:any;

}
