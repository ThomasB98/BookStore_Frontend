import { Component, OnInit } from '@angular/core';
import { OrderComponent } from "../order/order.component";
import { OrderService } from '../../service/orderService/order.service';

@Component({
  selector: 'app-dsiplay-order',
  imports: [OrderComponent],
  templateUrl: './dsiplay-order.component.html',
  styleUrl: './dsiplay-order.component.css'
})
export class DsiplayOrderComponent implements OnInit {
  orderLis:any[]=[];

  constructor(private _orderService:OrderService){

  }
  ngOnInit(): void {
    this.getOrders();
  }

  
  getOrders(){
    try{
        this._orderService.getOrders().subscribe(
          (res:any)=>{
            if(res.success){
              console.log("getOrder",res.data);
              this.orderLis=res.data.$values;
              console.log("getOrder data",this.orderLis);
              
            }
            else{
              console.log("res false",res);
            }
          }
        );
      }
    catch(error){
      console.log("error",error);
      
    }
  }
}
